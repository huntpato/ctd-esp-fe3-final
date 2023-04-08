import { FC } from 'react';
import { IComic } from 'types/IComic.type';
import { Paper, CardContent, Typography, Card, CardMedia, Skeleton} from '@mui/material';

type CardCheckoutProps = {
  comic: IComic | undefined;
};

const CardCheckout: FC<CardCheckoutProps> = ({ comic }) => {
  return (
    <Paper elevation={1} sx={{ padding: '3px' }}>
      <Card>
        {!comic ? (
          <Skeleton
            sx={{ height: 194, minWidth: '100%' }}
            animation="wave"
            variant="rectangular"
            data-testid="skeleton-image"
          />
        ) : (
          <CardMedia
            component="img"
            alt={comic.title}
            height="194"
            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            sx={{ objectFit: 'contain' }}
          />
        )}
        <CardContent>
          {!comic ? (
            <Skeleton
              sx={{ height: 25, minWidth: '100%' }}
              animation="wave"
              variant="rectangular"
              data-testid="skeleton-title"
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {comic.title}
            </Typography>
          )}
          {!comic ? (
            <Skeleton
              sx={{ height: 25, minWidth: '100%' }}
              animation="wave"
              variant="rectangular"
              data-testid="skeleton-price"
            />
          ) : (
            <Typography variant="body1">$ {comic.price}</Typography>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CardCheckout;
