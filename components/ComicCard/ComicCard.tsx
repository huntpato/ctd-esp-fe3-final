import React, { FC } from 'react'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Link from 'next/link';

interface IComicCardProps {
    title: string,
    image: string,
    id: number
}

const ComicCard: FC<IComicCardProps> = ({ title, image, id }) => {
  return (
    <Card variant='outlined' >
        <CardMedia
          component="img"
          height= "194"
          image={image}
          alt={title}
          sx={{objectFit: "contain"}}
        />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">COMPRAR</Button>
        <Link href={`/comics/${id}`}>
          <Button size="small" variant="outlined">VER DETALLE</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default ComicCard