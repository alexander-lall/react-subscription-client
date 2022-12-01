import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { UserContext } from '../../context/user';

const Account = () => {
    const [user, setUser] = useContext(UserContext);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const getSubscriptions = async () => {
            const { data } = await axios.get('/subscriptions');
            setSubscriptions(data.data);
        }
        if(user && user.token) {
            getSubscriptions();
        } 
    }, [user, user.token]);

    const manageSubscriptions = async () => {
        const { data } = await axios.get('/customer-portal');
        window.open(data)
    }

    return (
        <Container>
            <AccountCircleOutlinedIcon/>
            <Typography variant='h3' component='h1'>Benutzerkonto</Typography>
            <Typography cariant='body1' component='div'>Ihre Lizenzschlüssel</Typography>
            <Stack>
                {subscriptions && subscriptions.map((sub, idx) => (
                    <Grid container spacing={1} key={idx}>
                        <Grid xs={4}>
                            <Button variant='text'>
                                {sub.plan.nickname}
                            </Button>
                        </Grid>
                        <Grid xs={2}>
                            <Typography variant='body1' component='div'>
                            {(sub.plan.amount / 100).toLocaleString("de", {
                                style: 'currency',
                                currency: 'EUR'
                            })}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography variant='body1' component='span'>
                                {`Status: ${sub.status}`}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Typography variant='body1' component='span'>
                                {`Aktuelle Periode endet am: ${new Intl.DateTimeFormat("de").format(sub.current_period_end * 1000)}`}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Button onClick={manageSubscriptions} variant='contained'>
                                Verwalten
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </Container>
    );
}

export default Account;