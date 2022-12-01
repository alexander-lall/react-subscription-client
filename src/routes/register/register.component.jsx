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

const Register = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = async (e) => {
        e.preventDefault();
        
        axios.post("/register", { 
            name, 
            email, 
            password 
        })
        .then(({ data }) => {
            if(data.error) {
                enqueueSnackbar(data.error, { variant: "error" });
            }
            else{
                setName('');
                setEmail('');
                setPassword('');

                enqueueSnackbar('Wilkommen bei Brainssistance', { variant: "success" });
                
                navigate('/');
                
                localStorage.setItem('auth', JSON.stringify(data));
                setUser(data);
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
                        Los geht's!
                    </Typography>

                    <Typography variant='h6' component='div'>
                        Registrieren Sie sich kostenlos. Probieren Sie es aus
                    </Typography>

                    <Input label="Vor- und Nachname" value={name} setValue={setName}/>
                    <Input label="Email" value={email} setValue={setEmail}/>
                    <Input label="Passwort" value={password} setValue={setPassword} type='password'/>

                    <Button variant={'contained'} size={'large'} handleClick={handleClick}>
                        Registrieren
                    </Button>

                </Stack>

            </Paper>

        </Container>
    );
}

export default Register;