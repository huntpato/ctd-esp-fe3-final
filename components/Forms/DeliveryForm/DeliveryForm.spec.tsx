import { render, screen } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import DeliveryForm from './DeliveryForm';

const defaultData = {
    address1: "",
    address2: null,
    city: "",
    state: "",
    zipCode: "",
  };

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nombre: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DeliveryForm', () => {
  describe('when rendering default', () => {
    it('should render inputs', () => {
      render(
        <Wrapper>
          <DeliveryForm
            data={defaultData}
            activeStep={1}
            handleNext={() => {}}
            handleBack={() => {}}
          />
        </Wrapper>
      );

      const textFieldAddress1 = screen.getByRole('textbox', { name: 'Dirección' });
      const textFieldAddress2 = screen.getByRole('textbox', { name: 'Dirección alternativa' });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', { name: 'Código postal' });

      expect(textFieldAddress1).toBeInTheDocument();
      expect(textFieldAddress2).toBeInTheDocument();
      expect(textFieldCity).toBeInTheDocument();
      expect(textFieldState).toBeInTheDocument();
      expect(textFieldZip).toBeInTheDocument();
    });
    it('should be focus in the input address1', () => {
      render(
        <Wrapper>
          <DeliveryForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
            handleBack={() => {}}
          />
        </Wrapper>
      );
      const textFieldAddress1 = screen.getByRole('textbox', { name: 'Dirección' });
      expect(textFieldAddress1).toHaveFocus();
    });
  });
  describe('when users interact', () => {
    it('should render the information introduced', async () => {
      render(
        <Wrapper>
          <DeliveryForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
            handleBack={() => {}}
          />
        </Wrapper>
      );
      const textFieldAddress1 = screen.getByRole('textbox', { name: 'Dirección' });
      const textFieldAddress2 = screen.getByRole('textbox', { name: 'Dirección alternativa' });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', { name: 'Código postal' });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');

      expect(textFieldAddress1).toHaveValue('Siempre Viva 123');
      expect(textFieldAddress2).toHaveValue('address2');
      expect(textFieldCity).toHaveValue('Buenos Aires');
      expect(textFieldState).toHaveValue('BA');
      expect(textFieldZip).toHaveValue('1417');
    });
  });
  describe('when users dont put any information', () => {
    it('should render error messages when clicking on next without putting information', async () => {
      render(
        <Wrapper>
          <DeliveryForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
            handleBack={() => {}}
          />
        </Wrapper>
      );

      const nextButton = screen.getByRole('button', { name: 'SIGUIENTE' });

      await userEvent.click(nextButton);

      expect(await screen.findByText('La dirección es requerida.')).toBeInTheDocument();
      expect(await screen.findByText('La ciudad es requerida.')).toBeInTheDocument();
      expect(await screen.findByText('La provincia es requerida.')).toBeInTheDocument();
      expect(await screen.findByText('El código postal es requerido.')).toBeInTheDocument();
    });
  });
});