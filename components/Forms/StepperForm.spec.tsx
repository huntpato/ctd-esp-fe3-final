import { render, screen, waitFor } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepperForm from './StepperForm';
import comicMock from 'dh-marvel/test/mocks/comic';
import { IComic } from 'types/IComic.type';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nombre: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
}));

jest.useRealTimers();

describe('StepperForm', () => {
  describe('when rendering default', () => {
    it('should render steps', () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      const steps = [
        'Datos Personales',
        'Dirección de entrega',
        'Datos del pago',
      ];

      const stepperOne = screen.getByText('Datos Personales');
      const stepperTwo = screen.getByText('Dirección de entrega');
      const stepperThree = screen.getByText('Datos del pago');

      expect(stepperOne).toBeInTheDocument();
      expect(stepperTwo).toBeInTheDocument();
      expect(stepperThree).toBeInTheDocument();
    });
    it('should go next and go back', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1 & NEXT
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2 % GO BACK
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();
      const backButton = screen.getByRole('button', { name: /ANTERIOR/i });

      await userEvent.click(backButton);
      expect(await screen.findByText('Paso 1')).toBeInTheDocument();
    });
    it('should go to confirmacion-compra page', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();

      const nextButtonTwo = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldAddress1 = screen.getByRole('textbox', {
        name: 'Dirección',
      });
      const textFieldAddress2 = screen.getByRole('textbox', {
        name: 'Dirección alternativa',
      });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', {
        name: 'Código postal',
      });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');
      await userEvent.click(nextButtonTwo);

      //STEP 3
      expect(await screen.findByText('Paso 3')).toBeInTheDocument();
      const nextButtonEnd = screen.getByRole('button', { name: /FINALIZAR/i });
      const textFieldCard = screen.getByRole('textbox', {
        name: 'Número de tarjeta',
      });
      const textFieldNameCard = screen.getByRole('textbox', {
        name: 'Nombre como aparece en la tarjeta',
      });
      const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
      const textFieldCvc = screen.getByLabelText('CVC');

      await userEvent.type(textFieldCard, '4242424242424242');
      await userEvent.type(textFieldNameCard, 'Test User');
      await userEvent.type(textFieldExp, '0228');
      await userEvent.type(textFieldCvc, '123');
      await userEvent.click(nextButtonEnd);

      waitFor(async () => {
        expect(await mockPush).toHaveBeenCalledWith({
          pathname: '/confirmacion-compra',
        });
      });
    }, 20000);
  });
  describe('when puttin wrong information', () => {
    it('should render error alert without funds', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();

      const nextButtonTwo = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldAddress1 = screen.getByRole('textbox', {
        name: 'Dirección',
      });
      const textFieldAddress2 = screen.getByRole('textbox', {
        name: 'Dirección alternativa',
      });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', {
        name: 'Código postal',
      });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');
      await userEvent.click(nextButtonTwo);

      //STEP 3
      expect(await screen.findByText('Paso 3')).toBeInTheDocument();
      const nextButtonEnd = screen.getByRole('button', { name: /FINALIZAR/i });
      const textFieldCard = screen.getByRole('textbox', {
        name: 'Número de tarjeta',
      });
      const textFieldNameCard = screen.getByRole('textbox', {
        name: 'Nombre como aparece en la tarjeta',
      });
      const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
      const textFieldCvc = screen.getByLabelText('CVC');

      await userEvent.type(textFieldCard, '4111411141114111');
      await userEvent.type(textFieldNameCard, 'Test User');
      await userEvent.type(textFieldExp, '0228');
      await userEvent.type(textFieldCvc, '123');
      await userEvent.click(nextButtonEnd);

      //error without funds
      expect(
        await screen.findByText('Tarjeta sin fondos disponibles')
      ).toBeInTheDocument();
    }, 20000);
    it('should render error alert without Authorization Card', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();

      const nextButtonTwo = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldAddress1 = screen.getByRole('textbox', {
        name: 'Dirección',
      });
      const textFieldAddress2 = screen.getByRole('textbox', {
        name: 'Dirección alternativa',
      });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', {
        name: 'Código postal',
      });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');
      await userEvent.click(nextButtonTwo);

      //STEP 3
      expect(await screen.findByText('Paso 3')).toBeInTheDocument();
      const nextButtonEnd = screen.getByRole('button', { name: /FINALIZAR/i });
      const textFieldCard = screen.getByRole('textbox', {
        name: 'Número de tarjeta',
      });
      const textFieldNameCard = screen.getByRole('textbox', {
        name: 'Nombre como aparece en la tarjeta',
      });
      const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
      const textFieldCvc = screen.getByLabelText('CVC');

      await userEvent.type(textFieldCard, '4000400040004000');
      await userEvent.type(textFieldNameCard, 'Test User');
      await userEvent.type(textFieldExp, '0228');
      await userEvent.type(textFieldCvc, '123');
      await userEvent.click(nextButtonEnd);

      //error without authorization
      expect(
        await screen.findByText(
          'Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.'
        )
      ).toBeInTheDocument();
    }, 20000);
    it('should render error alert Card data incorrect', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();

      const nextButtonTwo = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldAddress1 = screen.getByRole('textbox', {
        name: 'Dirección',
      });
      const textFieldAddress2 = screen.getByRole('textbox', {
        name: 'Dirección alternativa',
      });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', {
        name: 'Código postal',
      });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');
      await userEvent.click(nextButtonTwo);

      //STEP 3
      expect(await screen.findByText('Paso 3')).toBeInTheDocument();
      const nextButtonEnd = screen.getByRole('button', { name: /FINALIZAR/i });
      const textFieldCard = screen.getByRole('textbox', {
        name: 'Número de tarjeta',
      });
      const textFieldNameCard = screen.getByRole('textbox', {
        name: 'Nombre como aparece en la tarjeta',
      });
      const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
      const textFieldCvc = screen.getByLabelText('CVC');

      await userEvent.type(textFieldCard, '4242424242424243');
      await userEvent.type(textFieldNameCard, 'Test User');
      await userEvent.type(textFieldExp, '0228');
      await userEvent.type(textFieldCvc, '123');
      await userEvent.click(nextButtonEnd);

      //error wrong card numbers
      expect(
        await screen.findByText('Datos de tarjeta incorrecta')
      ).toBeInTheDocument();
    }, 20000);
    it('should change the open state, open and close diferent alerts', async () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic} />
        </Wrapper>
      );

      //STEP 1
      const nextButton = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldName = screen.getByRole('textbox', { name: 'Nombre' });
      const textFieldLastname = screen.getByRole('textbox', {
        name: 'Apellido',
      });
      const textFieldEmail = screen.getByRole('textbox', { name: 'Email' });

      await userEvent.type(textFieldName, 'Test');
      await userEvent.type(textFieldLastname, 'User');
      await userEvent.type(textFieldEmail, 'test@user.com');
      await userEvent.click(nextButton);

      //STEP 2
      expect(await screen.findByText('Paso 2')).toBeInTheDocument();

      const nextButtonTwo = screen.getByRole('button', { name: /SIGUIENTE/i });
      const textFieldAddress1 = screen.getByRole('textbox', {
        name: 'Dirección',
      });
      const textFieldAddress2 = screen.getByRole('textbox', {
        name: 'Dirección alternativa',
      });
      const textFieldCity = screen.getByRole('textbox', { name: 'Ciudad' });
      const textFieldState = screen.getByRole('textbox', { name: 'Provincia' });
      const textFieldZip = screen.getByRole('textbox', {
        name: 'Código postal',
      });

      await userEvent.type(textFieldAddress1, 'Siempre Viva 123');
      await userEvent.type(textFieldAddress2, 'address2');
      await userEvent.type(textFieldCity, 'Buenos Aires');
      await userEvent.type(textFieldState, 'BA');
      await userEvent.type(textFieldZip, '1417');
      await userEvent.click(nextButtonTwo);

      //STEP 3
      expect(await screen.findByText('Paso 3')).toBeInTheDocument();
      const nextButtonEnd = screen.getByRole('button', { name: /FINALIZAR/i });
      const textFieldCard = screen.getByRole('textbox', {
        name: 'Número de tarjeta',
      });
      const textFieldNameCard = screen.getByRole('textbox', {
        name: 'Nombre como aparece en la tarjeta',
      });
      const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
      const textFieldCvc = screen.getByLabelText('CVC');

      await userEvent.type(textFieldCard, '4242424242424243');
      await userEvent.type(textFieldNameCard, 'Test User');
      await userEvent.type(textFieldExp, '0228');
      await userEvent.type(textFieldCvc, '123');
      await userEvent.click(nextButtonEnd);

      //error wrong card numbers
      expect(
        await screen.findByText('Datos de tarjeta incorrecta')
      ).toBeInTheDocument();

      await userEvent.clear(textFieldCard)
      await userEvent.type(textFieldCard, '4111411141114111');
      await userEvent.click(nextButtonEnd);

      expect(
        await screen.findByText('Tarjeta sin fondos disponibles')
      ).toBeInTheDocument();
 
    }, 20000);
  });
});
