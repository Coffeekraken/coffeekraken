module.exports = (__base64) => {

  describe('sugar.js.encoding.base64', () => {

    it('Should encode then decode the string "hello world" correctly', () => {
      const encoded = __base64.encode('hello world');
      const decoded = __base64.decode(encoded);
      expect(decoded).toEqual('hello world');
    });

  });

}