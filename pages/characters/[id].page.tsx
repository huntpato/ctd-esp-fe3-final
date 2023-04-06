import Head from 'next/head'
import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { ICharacter, ICharacterResponse } from 'types/ICharacter.type'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'

interface CharacterProps{
    character: ICharacter
}

const Character : NextPage<CharacterProps>= ({ character }) => {

  return (
    <>
        <Head>
            <title>Marvel Store</title>
            <meta name="description" content={`Marvel character: `}/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <BodySingle title="personaje">

        </BodySingle>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = parseInt(params?.id as string);
    const data = await getCharacter(id);
  
    return {
      props: {
        character: data,
      },
      revalidate: 10,
    };
  };
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const data: ICharacterResponse = await getCharacters();
  
    const paths = data.data.results.map((character) => {
      return { params: { id: character.id.toString() } };
    });
  
    return {
      paths,
      fallback: false,
    };
  };

export default Character