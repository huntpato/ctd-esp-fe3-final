import Head from 'next/head'
import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { ICharacter, ICharacterResponse } from 'types/ICharacter.type'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import { Grid, CardMedia } from "@mui/material";

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
        {/* <Grid container spacing={2} sx={{maxWidth: "600px", margin: "0 auto"}}>
                <Grid item xs={12} md={4} >
                  <CardMedia component="img" height= "350" image={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} sx={{objectFit: "contain"}}/>
                </Grid>
                <Grid item xs={12} md={8} sx={{alignSelf: "center"}}>
                </Grid>
            </Grid> */}
        </BodySingle>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) =>{
    const id = parseInt(params?.id as string);
    const character  = await getCharacter(id)

    return{
        props:{
            character
        }
    }
}

export const getStaticPaths: GetStaticPaths = async()=>{
    const data : ICharacterResponse = await getCharacters();

    const paths = data.data.results.map((character)=>{
        return { params: { id: character.id.toString()}}
    })

    return{
        paths,
        fallback: false,
    }
}

export default Character