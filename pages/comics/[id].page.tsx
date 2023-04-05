import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { IComic, IComicResponse } from 'types/IComic.type'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import { Grid, Paper, CardMedia, CardContent, Typography, Button } from "@mui/material";

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
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{backgroundColor: "yellow"}}>
                  <CardMedia component="img" height= "350" image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} sx={{objectFit: "contain"}}/>
                </Grid>
                <Grid item xs={12} md={8} sx={{backgroundColor: "red"}}>
                  <Paper elevation={1}>
                    <CardContent>
                      <Typography variant="h5">{comic.title}</Typography>
                      <Typography variant="body1">Antes $87</Typography>
                      <Typography variant="subtitle1">$72</Typography>
                      <Button size="medium" variant="contained" type="button">COMPRAR</Button>
                    </CardContent>
                  </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{backgroundColor: "yellow"}}>
              {/* <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${faq.id}a-content`}
                id={`panel${faq.id}a-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#000', color: '#fff' }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion> */}
            </Grid>
        </BodySingle>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) =>{
    const id = parseInt(params?.id as string);
    const comic  = await getComic(id)

    return{
        props:{
            comic
        }
    }
}

export const getStaticPaths: GetStaticPaths = async()=>{
    const data : IComicResponse = await getComics();

    const paths = data.data.results.map((comic)=>{
        return { params: { id: comic.id.toString()}}
    })

    return{
        paths,
        fallback: false,
    }
}

export default Comic

// ### Página 2: Detalle del Cómic (Comic)

// * La página deberá indicar al menos la siguiente información:
//   * Nombre del comic
//   * Descripción del comic
//   * Imagen principal
//   * Precio
//   * Precio anterior
//   * Botón de compra: en función de la disponibilidad de stock
//     * Si hay stock, el botón debe aparecer habilitado y ser funcional
//     * Si no hay stock, el botón debe estar deshabilitado y en gris, con el mensaje: Sin stock disponible 
//   * Lista de personajes asociados al cómic, con links a la página de cada personaje
// * Permitir que el contenido sea indexable por los buscadores.
// * Esta página debera utilizar el [Layout General](#layout-general)