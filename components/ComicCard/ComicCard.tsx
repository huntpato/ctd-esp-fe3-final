import React, { FC } from 'react'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

interface IComicCardProps {
    title: string,
    image: string
}

const ComicCard: FC<IComicCardProps> = ({ title, image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ height: 350 }}
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">COMPRAR</Button>
        <Button size="small" variant="outlined">VER MÁS</Button>
      </CardActions>
    </Card>
  )
}

export default ComicCard