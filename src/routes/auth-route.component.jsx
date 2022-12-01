import { useContext, } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import LoadingToRedirect from '../components/loading-to-redirect/loading-to-redirect.component';

import { UserContext } from '../context/user';

const AuthRoute = ({ ...rest }) => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    return user && user.token ? <Outlet/> : <LoadingToRedirect/>;
};

export default AuthRoute;