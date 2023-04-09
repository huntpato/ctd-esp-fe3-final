import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ICheckout } from 'types/ICheckout.type';
import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import CardSuccess from 'dh-marvel/components/CardSuccess/CardSuccess';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';

const CheckoutSuccess: NextPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();

  useEffect(() => {
    const data = localStorage.getItem('checkoutData');
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <Stack
      paddingTop={3}
      direction="column"
      alignItems="center"
      sx={{ width: '95%' }}
    >
      {dataCheckout ? (
        <>
          <CardSuccess data={dataCheckout} />
          <Link href="/">
            <Button size="small" variant="outlined" sx={{ margin: '30px 0px' }}>
              Volver al home
            </Button>
          </Link>
        </>
      ) : (
        <Typography variant="body2">Redirigiendo...</Typography>
      )}
    </Stack>
  );
};
(CheckoutSuccess as any).Layout = LayoutCheckout;

export default CheckoutSuccess;
