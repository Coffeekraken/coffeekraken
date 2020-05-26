"use strict";

module.exports = __argsToObject => {
  describe('sugar.js.cli.argsToObject', () => {
    it('Should process the passed args object correctly', done => {
      const object = __argsToObject('-a Yop', {
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
      });

      expect(object).toEqual({
        arg1: 'Yop',
        boolArg: false,
        objArg: {}
      });
      done();
    });
  });
};