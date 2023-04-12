import "@testing-library/jest-dom";
import { comic } from "dh-marvel/test/mocks/comic";
import { server } from "dh-marvel/test/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics", () => {
  describe("when sending a valid request", () => {
    it("should return status 200", async () => {
      const serverResponse = await fetch("/marvel/api/comics");
      expect(serverResponse.status).toBe(200);
    });

    it("should return 'comic' mocked data if no query is provided", async () => {
      const serverResponse = await fetch("/marvel/api/comics");
      const data = await serverResponse.json();

      expect(data).toEqual([expect.objectContaining(comic)]);
    });
  });
});