import {render, screen} from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import { comicsMock } from "dh-marvel/test/mocks/comics";
import { IComic } from "types/IComic.type";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render page title', async() => {
            render(<Index comics={comicsMock.data.results as unknown as IComic[]} total={comicsMock.data.total} offset={comicsMock.data.offset} limit={comicsMock.data.limit}/>)
            const title = screen.getByText('Marvel Cómics')
            expect(title).toBeInTheDocument()
        });
        it('should render card title', async() => {
            render(<Index comics={comicsMock.data.results as unknown as IComic[]} total={comicsMock.data.total} offset={comicsMock.data.offset} limit={comicsMock.data.limit}/>)
            const title = screen.getByText('Marvel Previews (2017)')
            expect(title).toBeInTheDocument()
        })
        it('should render card image', async() => {
            render(<Index comics={comicsMock.data.results as unknown as IComic[]} total={comicsMock.data.total} offset={comicsMock.data.offset} limit={comicsMock.data.limit}/>)
            const title = screen.getByAltText('Marvel Previews (2017)')
            expect(title).toBeInTheDocument()
        })
    })

})