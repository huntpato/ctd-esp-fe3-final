import { render, screen, waitFor } from '@testing-library/react';
import comicMock from 'dh-marvel/test/mocks/comic';
import userEvent from '@testing-library/user-event';
import { IComic } from 'types/IComic.type';
import ComicDetailAccordion from './ComicDetailAccordion';

describe('ComicDetailAccordion', () => {
  describe('when rendering component', () => {
    it('should render titles', () => {
      render(<ComicDetailAccordion comic={comicMock as unknown as IComic} />);
      const titleDescription = screen.getByText('Descripción');
      const titlePersonajes = screen.getByText('Personajes');
      expect(titleDescription).toBeInTheDocument();
      expect(titlePersonajes).toBeInTheDocument();
    });
    it('should not show content', () => {
      render(<ComicDetailAccordion comic={comicMock as unknown as IComic} />);
      const contentDescription = screen.getByText('Sin descripción disponible');
      const contentPersonajes = screen.getByText(
        'Sin listado de personajes disponible'
      );
      expect(contentDescription).not.toBeVisible();
      expect(contentPersonajes).not.toBeVisible();
    });
    it('should show content on clicking title', async () => {
      render(<ComicDetailAccordion comic={comicMock as unknown as IComic} />);
      const titleDescription = screen.getByText('Descripción');
      const titlePersonajes = screen.getByText('Personajes');
      userEvent.click(titleDescription);
      userEvent.click(titlePersonajes);

      expect(
        await screen.findByText('Sin descripción disponible')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('Sin listado de personajes disponible')
      ).toBeInTheDocument();
    });
  });
});
