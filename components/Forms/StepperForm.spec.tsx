import { render, screen } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepperForm from './StepperForm';
import comicMock from 'dh-marvel/test/mocks/comic';
import { IComic } from 'types/IComic.type';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nombre: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepperForm', () => {
  describe('when rendering default', () => {
    it('should render steps', () => {
      render(
        <Wrapper>
          <StepperForm comic={comicMock as unknown as IComic}/>
        </Wrapper>
      );

      const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];

      const stepperOne = screen.getByText("Datos Personales");
      const stepperTwo = screen.getByText("Dirección de entrega");
      const stepperThree = screen.getByText("Datos del pago");

      expect(stepperOne).toBeInTheDocument();
      expect(stepperTwo).toBeInTheDocument();
      expect(stepperThree).toBeInTheDocument();
    });
  });
});