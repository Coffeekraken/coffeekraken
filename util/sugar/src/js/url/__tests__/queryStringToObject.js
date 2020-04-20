module.exports = (__queryStringToObject) => {

  describe('sugar.js.url.queryStringToObject', () => {

    it('Should correctly parse the passed query string', () => {
      expect(__queryStringToObject(
        '?var1=value1&var2=value2'
      )).toEqual({ var1: 'value1', var2: 'value2' });
    });

  });

};