import { render, screen, waitFor } from '@testing-library/react';
import comicMock from 'dh-marvel/test/mocks/comic';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';
import ComicCardDetail from './ComicCardDetail';
import { IComic } from 'types/IComic.type';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
}));

describe('ComicCardDetail', () => {
  describe('when rendering component', () => {
    it('should render comic title', () => {
      render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
      const title = screen.getByText('Marvel Previews (2017)');
      expect(title).toBeInTheDocument();
    });
    it('should render comic old price', () => {
      render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
      const oldPrice = screen.getByText('Antes $87');
      expect(oldPrice).toBeInTheDocument();
    });
    it('should render comic current price', () => {
      render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
      const currentPrice = screen.getByText('$72');
      expect(currentPrice).toBeInTheDocument();
    });
    it('should render buy button', () => {
      render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
      const buyButton = screen.getByRole('button', { name: 'COMPRAR' });
      expect(buyButton).toBeInTheDocument();
    });
  });
  describe('when clicking on buying button', () => {
    it('should go to checkout page', async () => {
      render(<ComicCardDetail comic={comicMock as unknown as IComic} />);

      userEvent.click(screen.getByRole('button', { name: 'COMPRAR' }));

      waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(1, '/checkout?comic=82967');
      });
    });
  });
});
