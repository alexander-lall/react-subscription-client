import { Routes, Route } from 'react-router-dom';

import AuthRoute from './routes/auth-route.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Login from './routes/login/login.component';
import Register from './routes/register/register.component';
import StripeSuccess from './routes/stripe-success/stripe-success.component';
import StripeCancel from './routes/stripe-cancel/stripe-cancel.component';
import Account from './routes/account/account.component';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/> 
        <Route path='register' element={<Register/>}/>
        <Route path='secured/' element={<AuthRoute/>}>
          <Route path='stripe/success' element={<StripeSuccess/>}/>
          <Route path='stripe/cancel' element={<StripeCancel/>}/>
          <Route path='account' element={<Account/>}/>
        </Route>
      </Route>
 
    </Routes>
  );
}

export default App;
