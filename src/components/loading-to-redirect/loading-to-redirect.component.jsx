import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingToRedirect = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((currentCount) => --currentCount);
    }, 1000);
    countdown === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress/>
    </Box>
  );
};

export default LoadingToRedirect;