module.exports = (__toString) => {

  describe('sugar.js.string.toString', () => {


    it('Should process the passed string correctly', done => {

      const date = new Date();
      const dateString = date.toString();

      expect(__toString(true)).toBe('true');
      expect(__toString(false)).toBe('false');
      expect(__toString({
        hello: 'world'
      })).toBe('{"hello":"world"}');
      expect(__toString(function helloWorld() { })).toBe('function helloWorld() {}');
      expect(__toString(date)).toBe(dateString);
      expect(__toString([
        'hello', 'world'
      ])).toBe('["hello","world"]');
      expect(__toString(/(.*)/gm)).toBe('/(.*)/gm');
      expect(__toString(10)).toBe('10');
      expect(__toString(null)).toBe('null');
      expect(__toString(undefined)).toBe('undefined');

      done();
    });

  });

}