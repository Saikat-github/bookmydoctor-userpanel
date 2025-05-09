// useSocket.js - Custom hook approach
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AppContext } from "../context/AppContext";

export function useSocket(doctorId, date) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('connecting');
    const [loader, setLoader] = useState(false);
    const { backendUrl } = useContext(AppContext);

    const pollingInterval = useRef(null);

    useEffect(() => {
        const fetchRealTimeStatus = async () => {
            try {
                setLoader(true);
                const res = await axios.get(
                    `${backendUrl}/api/user/realtimestatus`,
                    { params: { date, doctorId }, withCredentials: true }
                );
                if (res.data.success) {
                    setData(res.data.realTimeData);
                } else {
                    setData(null);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        };

        if (date && doctorId) {
            fetchRealTimeStatus();
        }

        const socket = io(backendUrl);

        socket.on('connect', () => {
            setStatus('connected');
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
                pollingInterval.current = null;
            }
            socket.emit('subscribe-to-doctor', {doctorId, date});
        });

        socket.on('connect_error', () => {
            setStatus('failed');
            if (!pollingInterval.current) {
                pollingInterval.current = setInterval(fetchRealTimeStatus, 10000);
            }
        });

        socket.on('current-patient-update', (socketData) => {
                setData(socketData);
        });

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
            socket.disconnect();
        };
    }, [doctorId, date]);

    return { data, status, loader };
}