var import_jest_useragent_mock = require("jest-useragent-mock");
module.exports = (__testFn) => {
  describe("sugar.js.is.ie", () => {
    afterEach(() => {
      (0, import_jest_useragent_mock.clear)();
    });
    (0, import_jest_useragent_mock.mockUserAgent)("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)");
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn()).toBe(true);
    });
  });
};
