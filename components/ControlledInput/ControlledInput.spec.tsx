import { render, screen } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import ControlledInput from './ControlledInput';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nombre: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ControlledInput', () => {
  describe('when rendering default', () => {
    it('should render a text field', () => {
      render(
        <Wrapper>
          <ControlledInput name="name" label="Nombre" />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      expect(textFieldName).toBeInTheDocument();
      expect(textFieldName).toHaveValue('');
    });
    it('should render a text field with default value', () => {
      render(
        <Wrapper>
          <ControlledInput name="name" label="Nombre" defaultValue="Test" />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      expect(textFieldName).toHaveValue('Test');
    });
  });
  describe('when users interact with text input', () => {
    it('should render the information introduced', async () => {
      render(
        <Wrapper>
          <ControlledInput name="name" label="Nombre" />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });

      await userEvent.type(textFieldName, 'User');

      expect(textFieldName).toHaveValue('User');
    });
    it('should render the information introduced', async () => {
      render(
        <Wrapper>
          <ControlledInput name="name" label="Nombre" />
        </Wrapper>
      );

      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });

      await userEvent.type(textFieldName, 'User');

      expect(textFieldName).toHaveValue('User');
    });
  });
  describe('when users interact with number input', () => {
    it('should render the information introduced if numbers', async () => {
      const regexNumber = /^[0-9]*$/gm;

      render(
        <Wrapper>
          <ControlledInput
            name="number"
            label="Numero"
            regex={regexNumber}
            defaultValue=""
          />
        </Wrapper>
      );

      const textFieldNumber = screen.getByRole('textbox', { name: 'Numero' });

      await userEvent.type(textFieldNumber, '1234');

      expect(textFieldNumber).toHaveValue('1234');
    });
  });
});
