import { Fragment } from 'react';

import TextField from '@mui/material/TextField';


const Input = ({ label, type = "text", value, setValue }) => {
    return (
        <Fragment>
            <TextField sx={{width: '100%'}} label={label} type={type} onChange={e => setValue(e.target.value)} value={value} />
        </Fragment>
    );
}

export default Input;