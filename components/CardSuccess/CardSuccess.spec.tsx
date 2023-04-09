import { render, screen } from '@testing-library/react';
import CardSuccess from './CardSuccess';
import checkoutMock from 'dh-marvel/test/mocks/checkout';
import { ICheckout } from 'types/ICheckout.type';

describe('CardSuccess', () => {
  describe('when rendering component', () => {
    it('should render congrats message', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const message = screen.getByText(
        'Felicitaciones ¡Que disfrutes tu compra!'
      );
      expect(message).toBeInTheDocument();
    });
    it('should render comic image', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const image = screen.getByAltText('comic image');
      expect(image).toBeInTheDocument();
    });
    it('should render comic title', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const title = screen.getByText('Marvel Previews (2017)');
      expect(title).toBeInTheDocument();
    });
    it('should render comic price', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const price = screen.getByText('$ 72');
      expect(price).toBeInTheDocument();
    });
    it('should render customer name', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const name = screen.getByText('Test User');
      expect(name).toBeInTheDocument();
    });
    it('should render customer email', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const email = screen.getByText('test@user.com');
      expect(email).toBeInTheDocument();
    });
    it('should render customer address', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const address = screen.getByText('Siempre Viva 123');
      expect(address).toBeInTheDocument();
    });
    it('should render customer city and zip', () => {
      render(<CardSuccess data={checkoutMock as ICheckout} />);
      const cityZip = screen.getByText('Buenos Aires (1417)');
      expect(cityZip).toBeInTheDocument();
    });
  });
});
