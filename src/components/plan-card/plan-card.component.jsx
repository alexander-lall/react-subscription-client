import { useContext } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../context/user';

const PlanCard = ({ title, description, price, handleSubscription, userSubscriptions }) => {
    const [user] = useContext(UserContext);

    const buttonText = () => {
        if(userSubscriptions && userSubscriptions.includes(price.id)) {
            return "Weiteres Abo kaufen"
        } else if (user && user.token) {
            return "Abo kaufen";
        } else {
            return "Registrieren";
        }
    }

    return (
        <Card sx={{width: '345px'}}>
            <CardActionArea onClick={(e) => handleSubscription(e, price)}>
                <CardContent>
                    <Typography variant='h4' component='h3' mb={2}>
                        {title}
                    </Typography>
                    <Typography variant='subtitle2' coponent='div' mb={2}>
                        {description}
                    </Typography>
                    <Typography variant='h5' component='div' mb={2}>
                        {(price.unit_amount / 100).toLocaleString("de", {
                            style: 'currency',
                            currency: 'EUR'
                        })}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={(e) => handleSubscription(e, price)} size='small' color='primary'>
                    {buttonText()}
                </Button>
            </CardActions>
        </Card>
    )
}

export default PlanCard;