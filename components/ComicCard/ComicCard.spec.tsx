import { render, screen, waitFor } from '@testing-library/react';
import ComicCard from './ComicCard';
import comicMock from 'dh-marvel/test/mocks/comic';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockPush,
}));

describe('ComicCard', () => {
  describe('when rendering component', () => {
    it('should render comic image', () => {
      render(
        <ComicCard
          title={comicMock.title}
          image={`${comicMock.thumbnail.path}.${comicMock.thumbnail.extension}`}
          id={comicMock.id}
        />
      );
      const image = screen.getByAltText('Marvel Previews (2017)');
      expect(image).toBeInTheDocument();
    });
    it('should render comic title', () => {
      render(
        <ComicCard
          title={comicMock.title}
          image={`${comicMock.thumbnail.path}.${comicMock.thumbnail.extension}`}
          id={comicMock.id}
        />
      );
      const title = screen.getByAltText('Marvel Previews (2017)');
      expect(title).toBeInTheDocument();
    });
    it('should render buttons', () => {
      render(
        <ComicCard
          title={comicMock.title}
          image={`${comicMock.thumbnail.path}.${comicMock.thumbnail.extension}`}
          id={comicMock.id}
        />
      );
      const buyButton = screen.getAllByRole('button')[0];
      const seeMoreButton = screen.getAllByRole('button')[1];

      expect(buyButton).toHaveTextContent('COMPRAR');
      expect(seeMoreButton).toHaveTextContent('VER DETALLE');
    });
  });
  describe('when clicking on see more button', () => {
    it('should go to comic detail', async () => {
      render(
        <ComicCard
          title={comicMock.title}
          image={`${comicMock.thumbnail.path}.${comicMock.thumbnail.extension}`}
          id={comicMock.id}
        />
      );

      userEvent.click(screen.getByRole('button', { name: 'VER DETALLE' }));
      //   screen.debug()
      waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(1, '/comics/82967');
      });
    });
  });
});
