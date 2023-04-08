import React, { FC, useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { ICard } from "types/ICheckout.type";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import paymentSchema from "./schema";
import ControlledInput from "dh-marvel/components/ControlledInput/ControlledInput";
import { Box, Stack } from "@mui/material";
import StepperNavigation from "../StepperNavigation";

export type PaymentFormProps = {
  activeStep: number;
  handleNext: (data: ICard) => void;
  handleBack: () => void;
};

const PaymentForm: FC<PaymentFormProps> = ({ activeStep, handleNext, handleBack }) => {

  const regexNum = /^[0-9]*$/gm;

  const defaultValues = {
    cvc: "",
    expDate: "",
    nameOnCard: "",
    number: "",
  };

  const [payment, setPayment] = useState(defaultValues);

  const methods = useForm<ICard>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const { setFocus, handleSubmit, watch } = methods;

  useEffect(() => {
    setFocus("number");
  }, []);

  const { number, nameOnCard, expDate, cvc } = watch();

  useEffect(() => {
    setPayment({
      number: number,
      nameOnCard: nameOnCard,
      expDate: expDate,
      cvc: cvc,
    });
  }, [number, nameOnCard, expDate, cvc]);

  const onSubmit = (data: ICard) => {
    handleNext(data);
  };

  return (
    <Box id="PaymentForm">
      <Box paddingBottom={5}>
        <Cards
          cvc={payment.cvc}
          expiry={payment.expDate}
          name={payment.nameOnCard}
          number={payment.number}
        />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledInput
            name="number"
            regex={regexNum}
            label="Número de tarjeta"
            maxLength={16}
          />
          <ControlledInput
            name="nameOnCard"
            label="Nombre como aparece en la tarjeta"
          />
          <Stack direction="row" spacing={5}>
            <ControlledInput
              name="expDate"
              label="Exp MM/YY"
              regex={regexNum}
              maxLength={4}
            />
            <ControlledInput
              type="password"
              regex={regexNum}
              name="cvc"
              label="CVC"
              maxLength={3}
            />
          </Stack>
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={handleBack}
      />
    </Box>
  );
};

export default PaymentForm;