import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { getCharacter } from 'dh-marvel/services/marvel/marvel.service';
import { ICharacter } from 'types/ICharacter.type';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { Grid, CardMedia, Paper, CardContent, Typography } from '@mui/material';

interface CharacterProps {
  character: ICharacter;
}

const Character: NextPage<CharacterProps> = ({ character }) => {
  console.log(character);
  return (
    <>
      <Head>
        <title>Marvel Store</title>
        <meta
          name="description"
          content={`Marvel character: ${character.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={`Marvel character: ${character.name}`}>
        <Grid
          container
          spacing={2}
          sx={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="250"
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              sx={{ objectFit: 'contain' }}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={{ alignSelf: 'center' }}>
            <Paper elevation={1} sx={{ padding: '3px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" sx={{ textTransform: "uppercase" }}>
                  {character.name}
                </Typography>
                <Typography variant="body2">
                  {character.description !== null &&
                  character.description !== ''
                    ? character.description
                    : 'Sin descripción disponible'}
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </BodySingle>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
  };
};

export default Character;

