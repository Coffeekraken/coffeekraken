import { clear, mockUserAgent } from 'jest-useragent-mock';

module.exports = (__testFn) => {

  describe('sugar.js.is.samsungBrowser', () => {

    afterEach(() => { clear() });
    mockUserAgent('Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1');

    it('Should detect the passed variable type correctly', () => {
      expect(__testFn()).toBe(true);
    });

  });

}