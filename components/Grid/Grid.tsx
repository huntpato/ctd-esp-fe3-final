import React, { FC } from 'react'
import { Grid } from '@mui/material';
import { IComic } from 'types/IComic.type';
import ComicCard from '../ComicCard/ComicCard';

interface GridProps{
  comics: IComic[],
}

const GridLayout: FC<GridProps> = ( {comics} ) => {

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {comics.map((comic,index)=>(
        <Grid item xs={12} sm={4} md={4} key={index}>
          <ComicCard title={comic.title} image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}></ComicCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default GridLayout