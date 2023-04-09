import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { faqsData, FaqsType } from 'dh-marvel/components/faqs/faqsData';

const Faqs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Marvel Faqs</title>
        <meta name="description" content="frequently asked questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={'Preguntas Frecuentes'}>
        {faqsData.map((faq: FaqsType) => (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${faq.id}a-content`}
              id={`panel${faq.id}a-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </BodySingle>
    </>
  );
};

export default Faqs;
