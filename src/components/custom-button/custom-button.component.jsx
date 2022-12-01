import Button from '@mui/material/Button';

const CustomButton = ({ children, variant = "contained", size = "medium", handleClick }) => {
    return (
        <Button variant={variant} size={size} onClick={handleClick}>
            {children}
        </Button>
    );
}

export default CustomButton;