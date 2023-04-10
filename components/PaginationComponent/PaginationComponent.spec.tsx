import { render, screen } from '@testing-library/react';
import PaginationComponent from './PaginationComponent';
import { comicsMock } from "dh-marvel/test/mocks/comics";

describe('PaginationComponent', () => {
  describe('when rendering component', () => {
    it('should render pagination', () => {
      render(<PaginationComponent total={comicsMock.data.total} offset={comicsMock.data.offset} limit={12} />);
      const firstPage = screen.getByText('1');
      const lastPage = screen.getByText('4547');
      expect(firstPage).toBeInTheDocument();
      expect(lastPage).toBeInTheDocument();
    });
  });
});