import React, { FC } from 'react';
import Link from 'next/link';
import { Card, Typography, Button, CardMedia, CardContent, CardActions } from '@mui/material';

interface IComicCardProps {
  title: string;
  image: string;
  id: number;
}

const ComicCard: FC<IComicCardProps> = ({ title, image, id }) => {
  return (
    <Card variant="outlined">
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          COMPRAR
        </Button>
        <Link href={`/comics/${id}`}>
          <Button size="small" variant="outlined">
            VER DETALLE
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ComicCard;
