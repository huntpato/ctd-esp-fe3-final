import {render, screen} from "@testing-library/react";
import Faqs from "./faqs.page";

describe('FaqsPage', () => {
    describe('when rendering page', () => {
        it('should render the title', () => {
            render(<Faqs/>)
            const title = screen.getByText('Preguntas Frecuentes')
            expect(title).toBeInTheDocument()
        });
        it('should render the questions', () => {
            render(<Faqs/>)
            const questionOne = screen.getByText('¿Cuántos comics tienen?')
            const questionTwo = screen.getByText('¿Se puede reservar nuevos lanzamientos?')
            const questionThree = screen.getByText('¿Cuanto demoran las entregas?')
            const questionFour = screen.getByText('¿Qué métodos de pago están disponibles?')
            const questionFive = screen.getByText('¿Se aceptan devoluciones?')

            expect(questionOne).toBeInTheDocument()
            expect(questionTwo).toBeInTheDocument()
            expect(questionThree).toBeInTheDocument()
            expect(questionFour).toBeInTheDocument()
            expect(questionFive).toBeInTheDocument()
        });
    })
})