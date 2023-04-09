import {render, screen} from "@testing-library/react";
import Character from "./[id].page";
import characterMock from "dh-marvel/test/mocks/character";
import { ICharacter } from "types/ICharacter.type";

describe('CharcterPage', () => {
    describe('when rendering', () => {
        it('should render character title', async() => {
            render(<Character character={characterMock as unknown as ICharacter}/> )
            const title = screen.getByText('Marvel character: Beast (Ultimate)');
            expect(title).toBeInTheDocument()
        });
        it('should render character image', async() => {
            render(<Character character={characterMock as unknown as ICharacter}/> )
            const image = screen.getByAltText('Beast (Ultimate)');
            expect(image).toBeInTheDocument()
        });
        it('should render without description', async() => {
            render(<Character character={characterMock as unknown as ICharacter}/> )
            const description = screen.getByText('Sin descripción disponible');
            expect(description).toBeInTheDocument()
        });
    })
})