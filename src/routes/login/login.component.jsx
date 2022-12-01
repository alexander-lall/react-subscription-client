import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Input from '../../components/input/input.component';
import Button from '../../components/custom-button/custom-button.component';

import { UserContext } from '../../context/user';

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = async (e) => {
        e.preventDefault();
        
        axios.post("/login", { 
            email, 
            password 
        })
        .then(({ data }) => {
            console.log(data);

            if(data.error) {
                enqueueSnackbar(data.error, { variant: "error" });
            }
            else{
                setEmail('');
                setPassword('');

                localStorage.setItem('auth', JSON.stringify(data));
                setUser(data);

                navigate('/account');
            }
        })
        .catch((error) => {
            enqueueSnackbar("Etwas ist schief gelaufen", { variant: 'error'});
        })
    }


    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vh', minHeight: '80vh'}}>

            <Paper elevation={4} sx={{maxWidth: '600px'}}>

                <Stack spacing={2} padding={5} alignItems={'center'}>

                    <Typography variant='h3' component='h1'>
                        Melden Sie sich an!
                    </Typography>

                    <Typography variant='h6' component='div'>
                        ... und managen Sie Ihre Geräte
                    </Typography>

                    <Input label="Email" value={email} setValue={setEmail}/>
                    <Input label="Passwort" value={password} setValue={setPassword} type='password'/>

                    <Button variant={'contained'} size={'large'} handleClick={handleClick}>
                        Anmelden
                    </Button>

                </Stack>

            </Paper>

        </Container>
    );
}

export default Login;