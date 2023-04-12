import "@testing-library/jest-dom";
import comicWithoutStock from "dh-marvel/test/mocks/comicWithoutStock";
import { server } from "dh-marvel/test/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics by id", () => {
  describe("when sending a valid request", () => {
    it("should return status 200", async () => {
      const serverResponse = await fetch("/marvel/api/comics/1");
      expect(serverResponse.status).toBe(200);
    });
    it("should return 'comicWithoutStock' mocked data when id is 10", async () => {
      const serverResponse = await fetch("/marvel/api/comics/10");
      const data = await serverResponse.json();
      expect(data).toEqual(
        expect.objectContaining({ data: { results: [comicWithoutStock] } })
      );
    });
  });
});