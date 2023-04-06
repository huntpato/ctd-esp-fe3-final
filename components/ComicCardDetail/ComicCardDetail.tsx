import React, { FC } from 'react';
import { IComic } from 'types/IComic.type';
import { Paper, CardContent, Typography, Button } from '@mui/material';

interface ComicCardDetailProps {
  comic: IComic;
}

const ComicCardDetail: FC<ComicCardDetailProps> = ({ comic }) => {
  return (
    <Paper elevation={1} sx={{padding: "3px"}}>
      <CardContent >
        <Typography gutterBottom variant="h5">{comic.title}</Typography>
        {comic.oldPrice && comic.stock > 0 && (
          <Typography variant="body1">Antes ${comic.oldPrice}</Typography>
        )}
        <Typography gutterBottom variant="h6">${comic.price}</Typography>
        {comic.stock > 0 ? (
          <Button size="medium" variant="contained" type="button">
            COMPRAR
          </Button>
        ) : (
          <Button size="medium" variant="contained" type="button" disabled>
            COMPRAR
          </Button>
        )}
      </CardContent>
    </Paper>
  );
};

export default ComicCardDetail;
