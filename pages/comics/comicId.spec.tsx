import {render, screen} from "@testing-library/react";
import { IComic } from "types/IComic.type";
import Comic from "./[id].page";
import comicMock from "dh-marvel/test/mocks/comic";
import comicWithoutStockMock from "dh-marvel/test/mocks/comicWithoutStock";

describe('ComicPage', () => {
    describe('when rendering', () => {
        it('should render comic title', async() => {
            render(<Comic comic={comicMock as unknown as IComic}/>)
            const heading = screen.getAllByText("Marvel Previews (2017)")[0];
            expect(heading).toBeInTheDocument()
        });
        it('should render comic image', async() => {
            render(<Comic comic={comicMock as unknown as IComic}/>)
            const image = screen.getByAltText("Marvel Previews (2017)");
            expect(image).toBeInTheDocument()
        });
        it('should render COMPRAR', async() => {
            render(<Comic comic={comicMock as unknown as IComic}/>)
            const button = screen.getAllByRole('button')[0];
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('COMPRAR')
        });
    })
    describe('when rendering a comic that has no stock', () => {
        it('should render a disabled COMPRAR button', async() => {
            render(<Comic comic={comicWithoutStockMock as unknown as IComic}/>)
            const button = screen.getAllByRole('button')[0];
            expect(button).toHaveAttribute('disabled')
        });
    })
})