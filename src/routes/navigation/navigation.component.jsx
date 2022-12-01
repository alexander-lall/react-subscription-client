import { Fragment, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { UserContext } from '../../context/user';

const Navigation = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("auth");
        setUser({ user: {}, token: ""});

        navigate('/login');
    };

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Button component={Link} to='/' color='inherit'>
                                    Home
                                </Button>
                            </Box>
                            {user && user.token ? (
                                <Fragment>
                                    <Button component={Link} to='/secured/account' color="inherit">
                                        Dashboard
                                    </Button>
                                    <Button onClick={logout} color="inherit">
                                        Logout
                                    </Button>
                                </Fragment>                                
                                ) : (
                                    <Fragment>
                                        <Button component={Link} to='/register' color="inherit">
                                            Register
                                        </Button>
                                        <Button component={Link} to='/login' color="inherit">
                                            Login
                                        </Button>
                                    </Fragment>
                                )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;