import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const StripeCancel = () => {
    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
            <WarningAmberIcon sx={{ fontSize: '100px'}}/>
        </Box>
    )
}

export default StripeCancel;