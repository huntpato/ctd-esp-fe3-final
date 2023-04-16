import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IAddress, ICard, ICheckout, ICustomer } from 'types/ICheckout.type';
import { checkOutPost } from 'dh-marvel/services/checkout/checkout.service';
import { IComic } from 'types/IComic.type';
import CustomerDataForm from './CustomerForm/CustomerForm';
import DeliveryForm from './DeliveryForm/DeliveryForm';
import PaymentForm from './PaymentForm/PaymentForm';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Alert,
  Snackbar, 
} from '@mui/material';
import catchError from './handleCheckoutErros';

const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];

type StepperForm = {
  comic?: IComic;
};

const StepperForm: FC<StepperForm> = ({ comic }) => {
  const defaultValue = {
    customer: {
      name: '',
      lastname: '',
      email: '',
      address: {
        address1: '',
        address2: null,
        city: '',
        state: '',
        zipCode: '',
      },
    },
    card: {
      number: '',
      cvc: '',
      expDate: '',
      nameOnCard: '',
    },
    order: {
      name: '',
      image: '',
      price: 0,
    },
  };

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useState<ICheckout>(defaultValue);
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    {
      comic &&
        setCheckoutData({
          ...checkoutData,
          order: {
            name: comic.title,
            image: `${comic?.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.price,
          },
        });
    }
  }, [comic]);

  const handleSubmitCustomerForm = (data: ICustomer) => {
    setCheckoutData({
      ...checkoutData,
      customer: { ...data },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitAddressForm = (data: IAddress) => {
    setCheckoutData({
      ...checkoutData,
      customer: {
        ...checkoutData.customer,
        address: { ...data },
      },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitPaymentForm = (data: ICard) => {
    setCheckoutData({
      ...checkoutData,
      card: {
        ...data,
      },
    });
    const dataForm = {
      ...checkoutData,
      card: {
        ...data,
      },
    };

    const response = checkOutPost(dataForm);

    response.then((response) => {
      if (!response.data) {
        const error = catchError(response);
        setError(error);
        return;
      } else {
        const customer = response.data.customer;
        const order = response.data.order;

        localStorage.setItem(
          'checkoutData',
          JSON.stringify({
            customer: customer,
            order: order,
          })
        );
        router.push({
          pathname: '/confirmacion-compra',
        });
      }
    });

    if (error) {
      setOpen(true);
    }
  };

  const handleBack = () => {
    activeStep > 0 && setActiveStep(activeStep - 1);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Typography
          sx={{
            paddingBottom: '10px',
          }}
          variant="h5"
        >
          Paso {activeStep + 1}
        </Typography>
        {activeStep === 0 && (
          <CustomerDataForm
            data={checkoutData.customer}
            activeStep={activeStep}
            handleNext={handleSubmitCustomerForm}
          />
        )}
        {activeStep === 1 && (
          <DeliveryForm
            data={checkoutData.customer.address}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitAddressForm}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitPaymentForm}
          />
        )}
      </Box>
      {error !== '' && (
        <>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
              severity="error"
            >
              {error}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default StepperForm;
