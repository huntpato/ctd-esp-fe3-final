import { render, screen } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomerDataForm from './CustomerForm';
import userEvent from '@testing-library/user-event';

const defaultData = {
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

describe('CustomerForm', () => {
  describe('when rendering default', () => {
    it('should render inputs', () => {
      render(
        <Wrapper>
          <CustomerDataForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
          />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', { name: 'Apellido' });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      expect(textFieldName).toBeInTheDocument();
      expect(textFieldLastname).toBeInTheDocument();
      expect(textFieldEmail).toBeInTheDocument();
    });
    it('should be focus in the input name', () => {
      render(
        <Wrapper>
          <CustomerDataForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
          />
        </Wrapper>
      );
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      expect(textFieldName).toHaveFocus();
    });
  });
  describe('when users interact', () => {
    it('should render the information introduced', async () => {
      render(
        <Wrapper>
          <CustomerDataForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
          />
        </Wrapper>
      );
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', { name: 'Apellido' });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');

      expect(textFieldName).toHaveValue('Test');
      expect(textFieldLastname).toHaveValue('User');
      expect(textFieldEmail).toHaveValue('test@user.com');
    });
  });
  describe('when users put none or wrong information', () => {
    it('should render error messages clicking on next without putting information', async () => {
      render(
        <Wrapper>
          <CustomerDataForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
          />
        </Wrapper>
      );

      const nextButton = screen.getByRole('button', { name: 'SIGUIENTE' });

      await userEvent.click(nextButton);

      expect(await screen.findByText('El nombre es requerido.')).toBeInTheDocument();
      expect(await screen.findByText('El apellido es requerido.')).toBeInTheDocument();
      expect(await screen.findByText('El email es requerido.')).toBeInTheDocument();
    });
    it('should render error message when typing less than 2 characters and invalid email', async () => {
      render(
        <Wrapper>
          <CustomerDataForm
            data={defaultData}
            activeStep={0}
            handleNext={() => {}}
          />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', { name: 'Apellido' });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });
      const nextButton = screen.getByRole('button', { name: 'SIGUIENTE' });

      await userEvent.type(textFieldName, 'T');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test');
      await userEvent.click(nextButton);

      expect(await screen.findByText('Ingrese al menos 2 caracteres.')).toBeInTheDocument();
      expect(await screen.findByText('Ingrese un email válido.')).toBeInTheDocument();
    });
  });
});
