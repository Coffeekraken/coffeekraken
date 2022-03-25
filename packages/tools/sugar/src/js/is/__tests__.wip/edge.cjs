var import_jest_useragent_mock = require("jest-useragent-mock");
module.exports = (__testFn) => {
  describe("sugar.js.is.edge", () => {
    afterEach(() => {
      (0, import_jest_useragent_mock.clear)();
    });
    (0, import_jest_useragent_mock.mockUserAgent)("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43");
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn()).toBe(true);
    });
  });
};
