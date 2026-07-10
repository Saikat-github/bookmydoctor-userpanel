// useSocket.js - Production-grade version
import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AppContext } from '../context/AppContext';



export function useSocket(docAuthId, date) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('connecting');
    const [loader, setLoader] = useState(false);
    const { backendUrl } = useContext(AppContext);

    const socketRef = useRef(null);
    const pollingInterval = useRef(null);
    const paramsRef = useRef({ docAuthId, date });

    // keep latest params available to callbacks without recreating them
    paramsRef.current = { docAuthId, date };

    const startPolling = useCallback(() => {
        if (pollingInterval.current) return;
        pollingInterval.current = setInterval(fetchRealTimeStatus, 10000);
    }, []);

    const stopPolling = useCallback(() => {
        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
            pollingInterval.current = null;
        }
    }, []);

    const fetchRealTimeStatus = useCallback(async () => {
        const { docAuthId, date } = paramsRef.current;
        if (!docAuthId || !date) return;
        try {
            setLoader(true);
            const res = await axios.get(`${backendUrl}/api/user/livestatus`, {
                params: { date, docAuthId },
                withCredentials: true,
            });
            setData(res.data.success ? res.data.realTimeData : null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }, []);

    // Effect 1: create ONE socket connection for the lifetime of this hook.
    // Does not depend on docAuthId/date, so it never tears down/reconnects
    // just because the subscription target changed.
    useEffect(() => {
        const socket = io(backendUrl);
        socketRef.current = socket;

        socket.on('connect', () => {
            setStatus('connected');
            stopPolling();
            const { docAuthId, date } = paramsRef.current;
            if (docAuthId && date) {
                socket.emit('subscribe-to-doctor', { docAuthId, date });
            }
        });

        // fires on any drop AFTER a successful connect (server restart, network blip, etc.)
        socket.on('disconnect', () => {
            setStatus('failed');
            startPolling();
        });

        socket.on('connect_error', () => {
            setStatus('failed');
            startPolling();
        });

        socket.on('current-patient-update', (socketData) => {
            setData(socketData);
        });

        return () => {
            stopPolling();
            socket.disconnect();
            socketRef.current = null;
        };
    }, [startPolling, stopPolling]);

    // Effect 2: handle subscription target changes (docAuthId/date) without
    // touching the socket connection itself.
    useEffect(() => {
        if (!docAuthId || !date) return;

        fetchRealTimeStatus(); // REST fallback so UI has data immediately

        const socket = socketRef.current;
        if (socket && socket.connected) {
            socket.emit('subscribe-to-doctor', { docAuthId, date });
        }

        return () => {
            if (socket && socket.connected) {
                socket.emit('unsubscribe-from-doctor', { docAuthId, date });
            }
        };
    }, [docAuthId, date]);

    return { data, status, loader };
}