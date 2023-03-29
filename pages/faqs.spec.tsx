import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Faqs from './faqs.page';

describe('FaqsPage', () => {
  describe('when rendering page', () => {
    it('should render the title', () => {
      render(<Faqs />);
      const title = screen.getByText('Preguntas Frecuentes');
      expect(title).toBeInTheDocument();
    });
    it('should render the questions', () => {
      render(<Faqs />);
      const questionOne = screen.getByText('¿Cuántos comics tienen?');
      const questionTwo = screen.getByText(
        '¿Se puede reservar nuevos lanzamientos?'
      );
      const questionThree = screen.getByText('¿Cuanto demoran las entregas?');
      const questionFour = screen.getByText(
        '¿Qué métodos de pago están disponibles?'
      );
      const questionFive = screen.getByText('¿Se aceptan devoluciones?');

      expect(questionOne).toBeInTheDocument();
      expect(questionTwo).toBeInTheDocument();
      expect(questionThree).toBeInTheDocument();
      expect(questionFour).toBeInTheDocument();
      expect(questionFive).toBeInTheDocument();
    });
  });
  describe('when clicking on a question', () => {
    it('should render the answer', async () => {
      render(<Faqs />);
      const questionThree = screen.getByText('¿Cuanto demoran las entregas?');
      expect(questionThree).toBeEnabled();

      await userEvent.click(questionThree);
      expect(
        await screen.findByText(
          'Todas nuestras entregas son enviadas a través de DH-Express, que alcanza a todo el país en 24hs.'
        )
      ).toBeVisible();
    });
  });
});
