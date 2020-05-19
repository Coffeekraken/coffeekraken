module.exports = (__argsToString) => {
  describe('sugar.js.string.argsToString', () => {
    it('Should process the passed args object correctly', (done) => {
      const string = __argsToString(
        {
          arg1: 'Hello world',
          boolArg: true,
          objArg: {
            content: 'Nelson'
          },
          arrayArg: ['item0', 'item 1', 'item 2']
        },
        {
          arg1: {
            type: 'String',
            alias: 'a',
            default: 'Plop'
          },
          boolArg: {
            type: 'Boolean',
            alias: 'b',
            default: false
          },
          objArg: {
            type: 'Object',
            default: {}
          },
          arrayArg: {
            type: 'Array'
          }
        }
      );

      expect(string).toBe(
        '-a `Hello world` -b  --objArg `{"content":"Nelson"}` --arrayArg `["item0","item 1","item 2"]`'
      );

      done();
    });
  });
};
