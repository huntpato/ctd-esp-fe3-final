import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IComic } from 'types/IComic.type';
import { getComicsById } from 'dh-marvel/services/comic/comic.service';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { Box, Stack } from '@mui/material';
import CardCheckout from 'dh-marvel/components/CardCheckout/CardCheckout';
import StepperForm from 'dh-marvel/components/Forms/StepperForm';
import { Grid, CardMedia, Paper, CardContent, Typography } from '@mui/material';

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
    }
  }, [comic]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ backgroundColor: 'red' }}>
          <StepperForm comic={comicData} />
        </Grid>
        <Grid item xs={12} md={8} sx={{ backgroundColor: 'yellow' }}>
          <CardCheckout comic={comicData} />
        </Grid>
      </Grid>
      {/* <Box
      sx={{
        padding: { xs: '80px 20px', sm: '100px 20px' },
      }}
    >
      <Stack
        direction={{ sm: 'column', md: 'row-reverse' }}
        spacing={{ xs: 15, sm: 15, md: 8, xl: 20 }}
        alignItems={{ xs: 'center', sm: 'center', md: 'self-start' }}
      >
        <Box
          sx={{
            backgroundColor: '#f3f3f3',
            height: '100%',
            padding: '30px',
          }}
        >
          <CardCheckout comic={comicData} />
        </Box>
        <Box>
          <StepperForm comic={comicData} />
        </Box>
      </Stack>
    </Box> */}
    </>
  );
};
(Checkout as any).Layout = LayoutCheckout;

export default Checkout;
