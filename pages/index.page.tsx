import { useEffect } from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { IComic } from 'types/IComic.type';
import { Stack } from '@mui/material';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import GridLayout from 'dh-marvel/components/Grid/Grid';
import PaginationComponent from 'dh-marvel/components/PaginationComponent/PaginationComponent';

interface HomeProps {
  comics: IComic[];
  total: number;
  offset: number;
  limit: number;
}

const QTY_OF_COMICS = 12;

const Index: NextPage<HomeProps> = ({ comics, total, offset, limit }) => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Head>
        <title>Marvel Store</title>
        <meta name="description" content="Marvel comic store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={'Marvel Cómics'}>
        <Stack alignItems="center" spacing={0} margin="0">
          <PaginationComponent
            total={total}
            offset={offset}
            limit={limit}
          ></PaginationComponent>
          <GridLayout comics={comics}></GridLayout>
          <PaginationComponent
            total={total}
            offset={offset}
            limit={limit}
          ></PaginationComponent>
        </Stack>
      </BodySingle>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const offset = query.offset ? parseInt(query.offset as string, 10) : 0;
  const comics = await getComics(offset, QTY_OF_COMICS);

  return {
    props: {
      comics: comics.data.results,
      total: comics.data.total,
      offset,
      limit: QTY_OF_COMICS,
    },
  };
};

export default Index;
