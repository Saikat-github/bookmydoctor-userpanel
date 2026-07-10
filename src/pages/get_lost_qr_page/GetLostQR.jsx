import { useParams } from 'react-router-dom';
import { SendAndVerifyOTP } from '../../components';


const GetLostQR = () => {
  const { docAuthId } = useParams();

  return (
    <SendAndVerifyOTP docAuthId={docAuthId}/>
  )
}

export default GetLostQR