import { FC } from 'react';
import { ICheckout } from 'types/ICheckout.type';
import {
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  Paper,
  Grid,
} from '@mui/material';

type CardSuccessProps = {
  data: ICheckout;
};

const CardSuccess: FC<CardSuccessProps> = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'green',
          marginBottom: '15px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>
          Felicitaciones ¡Que disfrutes tu compra!
        </Typography>
      </Box>
      <Box>
        <Paper elevation={1}>
          <Card>
            <CardMedia
              component="img"
              alt="comic image"
              height="194"
              image={`${data?.order.image}`}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data?.order.name}
              </Typography>
              <Typography variant="body1">$ {data?.order.price}</Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" paddingBottom={2}>
                Datos Personales:
              </Typography>
              <Typography variant="body2" paddingBottom={1}>
                {data?.customer.name} {data?.customer.lastname}
              </Typography>
              <Typography variant="body2" paddingBottom={1}>
                {data?.customer.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Card>
              <CardContent>
                <Typography variant="h6" paddingBottom={2}>
                  Dirección de entrega:
                </Typography>
                <Typography variant="body2" paddingBottom={1}>
                  {data?.customer.address.address1}
                </Typography>
                <Typography variant="body2" paddingBottom={1}>
                  {data?.customer.address.city} (
                  {data?.customer.address.zipCode})
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CardSuccess;
