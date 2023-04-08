import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from './schema';
import { ICustomer } from 'types/ICheckout.type';
import { Stack } from '@mui/material';
import ControlledInput from 'dh-marvel/components/ControlledInput/ControlledInput';
import StepperNavigation from '../StepperNavigation';

export type CustomerDataProps = {
  data: ICustomer;
  activeStep: number;
  handleNext: (data: ICustomer) => void;
};

const CustomerDataForm: FC<CustomerDataProps> = ({ data, activeStep, handleNext }: CustomerDataProps) => {

  const methods = useForm<ICustomer>({
    resolver: yupResolver(personalDataSchema),
    defaultValues: { ...data },
  });
  
  const { setFocus, handleSubmit } = methods;

  useEffect(() => {
    setFocus('name');
  }, []);

  const onSubmit = (data: ICustomer) => {
    handleNext(data);
  };
  
  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledInput name="name" label="Nombre" />
          <ControlledInput name="lastname" label="Apellido" />
          <ControlledInput name="email" label="Email" />
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={() => {}}
      />
    </Stack>
  );
};

export default CustomerDataForm;
