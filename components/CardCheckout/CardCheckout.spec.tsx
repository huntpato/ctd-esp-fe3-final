import { render, screen } from '@testing-library/react';
import CardCheckout from './CardCheckout';
import comicMock from 'dh-marvel/test/mocks/comic';
import { IComic } from 'types/IComic.type';

describe('CardCheckout', () => {
  describe('when rendering component without data should render skeleton', () => {
    it('should render image skeleton', () => {
      render(<CardCheckout comic={undefined} />);
      const image = screen.getByTestId('skeleton-image');
      expect(image).toBeInTheDocument();
    });
    it('should render title skeleton', () => {
      render(<CardCheckout comic={undefined} />);
      const title = screen.getByTestId('skeleton-title');
      expect(title).toBeInTheDocument();
    });
    it('should render price skeleton', () => {
      render(<CardCheckout comic={undefined} />);
      const price = screen.getByTestId('skeleton-price');
      expect(price).toBeInTheDocument();
    });
  });
  describe('when rendering component with data', () => {
    it('should render image', () => {
      render(<CardCheckout comic={comicMock as unknown as IComic} />);
      const image = screen.getByAltText('Marvel Previews (2017)');
      expect(image).toBeInTheDocument();
    });
    it('should render title', () => {
      render(<CardCheckout comic={comicMock as unknown as IComic} />);
      const title = screen.getByText('Marvel Previews (2017)');
      expect(title).toBeInTheDocument();
    });
    it('should render price', () => {
      render(<CardCheckout comic={comicMock as unknown as IComic} />);
      const price = screen.getByText('$ 72');
      expect(price).toBeInTheDocument();
    });
  });
});
