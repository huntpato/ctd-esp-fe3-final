import { render, screen } from '@testing-library/react';
import CheckoutSuccess from './confirmacion-compra.page';
import checkoutMock from 'dh-marvel/test/mocks/checkout';


  describe('CheckoutSuccess', () => {
    it('renders the CardSuccess component when dataCheckout is available', () => {
      const mockDataCheckout = checkoutMock

      localStorage.setItem('checkoutData', JSON.stringify(mockDataCheckout));
      render(<CheckoutSuccess />);
      const message = screen.getByText(
        'Felicitaciones ¡Que disfrutes tu compra!'
      );
      expect(message).toBeInTheDocument();
    });
  });