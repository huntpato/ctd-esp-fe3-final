import React, { FC } from 'react';
import { IComic } from 'types/IComic.type';
import { Paper, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

interface ComicDAprops {
  comic: IComic;
}

const ComicDetailAccordion: FC<ComicDAprops> = ({ comic }) => {
  return (
    <Paper elevation={1} sx={{width: "100%"}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descripción</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            {comic.description !== null && comic.description !== ''
              ? comic.description
              : 'Sin descripción disponible'}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Personajes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comic.characters.items.length ? (
            comic.characters.items.map((character) => {
              return (
                <Link href="/">
                  <Button size="small" variant="text">
                    {character.name}
                  </Button>
                </Link>
              );
            })
          ) : (
            <Typography variant="body2">
              Sin listado de personajes disponible
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ComicDetailAccordion;
