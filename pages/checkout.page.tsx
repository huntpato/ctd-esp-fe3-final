import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IComic } from 'types/IComic.type';
import { getComicsById } from 'dh-marvel/services/comic/comic.service';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { Grid, Typography } from '@mui/material';
import CardCheckout from 'dh-marvel/components/CardCheckout/CardCheckout';
import StepperForm from 'dh-marvel/components/Forms/StepperForm';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';

const Checkout: NextPage = () => {
  const router = useRouter();
  const { comic } = router.query;
  const [comicData, setComicData] = useState<IComic>();

  useEffect(() => {
    const id = parseInt(comic as string);

    if (comic) {
      getComicsById(id).then((data) => {
        setComicData(data);
      });
    } else{
      router.push('/');
    }
  }, [comic]);

  return (
    <BodySingle title={ comicData && `Checkout: ${comicData?.title}`}>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {comicData ? (
          <>
            <Grid item xs={12} md={8}>
              <StepperForm comic={comicData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardCheckout comic={comicData} />
            </Grid>
          </>
        ):(
          <Typography variant="body2" sx={{margin: "0 auto"}}>Redirigiendo...</Typography>
        )}
      </Grid>
    </BodySingle>
  );
};

(Checkout as any).Layout = LayoutCheckout;

export default Checkout;
