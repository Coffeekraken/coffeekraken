import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var import_jest_useragent_mock = require("jest-useragent-mock");
module.exports = (__testFn) => {
  describe("sugar.js.is.ucBrowser", () => {
    afterEach(() => {
      (0, import_jest_useragent_mock.clear)();
    });
    (0, import_jest_useragent_mock.mockUserAgent)("Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; F5121 Build/34.0.A.1.247) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.5.1.944 Mobile Safari/537.36");
    it("Should detect the passed variable type correctly", () => {
      expect(__testFn()).toBe(true);
    });
  });
};
