import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { IComic, IComicResponse } from 'types/IComic.type'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import ComicCardDetail from 'dh-marvel/components/ComicCardDetail/ComicCardDetail'
import ComicDetailAccordion from 'dh-marvel/components/ComicDetailAccordion/ComicDetailAccordion'
import { Grid, CardMedia } from "@mui/material";

interface ComicProps{
    comic: IComic
}

const Comic : NextPage<ComicProps> = ({ comic }) => {
    
  return (
    <>
        <Head>
            <title>Marvel Store</title>
            <meta name="description" content={`Marvel comic: ${comic.title}`}/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <BodySingle title={comic.title}>
            <Grid container spacing={2} sx={{maxWidth: "600px", margin: "0 auto"}}>
                <Grid item xs={12} md={4} >
                  <CardMedia component="img" height= "350" image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} sx={{objectFit: "contain"}}/>
                </Grid>
                <Grid item xs={12} md={8} sx={{alignSelf: "center"}}>
                  <ComicCardDetail comic={comic}></ComicCardDetail>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{maxWidth: "600px", margin: "0 auto"}}>
              <ComicDetailAccordion comic={comic}></ComicDetailAccordion>
            </Grid>
        </BodySingle>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) =>{
    const id = parseInt(params?.id as string);
    const data  = await getComic(id)

    return{
        props:{
            comic: data
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async()=>{
    const data : IComicResponse = await getComics();

    const paths = data.data.results.map((comic)=>{
        return { params: { id: comic.id.toString()}}
    })

    return{
        paths,
        fallback: true,
    }
}

export default Comic;