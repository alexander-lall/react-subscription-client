import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { UserContext } from '../../context/user';

const StripeSuccess = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getSubscriptionStatus = async () => {
            const { data } = await axios.get('/subscription-status');
            console.log("Sub data: " + data);
            // If the user has np subscriptions
            if(data && data.length === 0) {
                navigate('/');
            } else {
                const auth = JSON.parse(localStorage.getItem('auth'));
                auth.user = data;
                // update user in local storage
                localStorage.setItem('auth', JSON.stringify(auth));
                // update user in context
                setUser(auth);
                /// make sure local storage updated
                setTimeout(() => {
                    navigate('/secured/account');
                }, 1000);                
            }
        }
        getSubscriptionStatus();
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress/>
        </Box>
    )
}

export default StripeSuccess;