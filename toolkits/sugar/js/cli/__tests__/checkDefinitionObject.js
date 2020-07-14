"use strict";

module.exports = __checkDefinitionObject => {
  describe('sugar.js.cli.checkDefinitionObject', () => {
    it('Should check a valid definition object correctly', done => {
      const res = __checkDefinitionObject({
        arg1: {
          type: 'String',
          alias: 'a',
          description: 'Something cool',
          default: 'Hello world'
        }
      });

      expect(res).toBe(true);
      done();
    });
    it('Should check an invalid definition object due to a bad type correctly', done => {
      const res = __checkDefinitionObject({
        arg1: {
          type: 'SCommand',
          alias: 'a',
          description: 'Something cool',
          default: 'Hello world'
        }
      });

      expect(res).toBe(`The \"type\" property of an argument definition object has to be one of these values \"string,number,object,array,boolean\". You've passed \"SCommand\" for your argument \"arg1\"...`);
      done();
    });
    it('Should check an invalid definition object due to a bad alias correctly', done => {
      const res = __checkDefinitionObject({
        arg1: {
          type: 'String',
          alias: 'ab',
          description: 'Something cool',
          default: 'Hello world'
        }
      });

      expect(res).toBe(`The \"alias\" property of an argument definition object has to be a 1 letter String. You've passed \"ab\" for your argument \"arg1\"...`);
      done();
    });
    it('Should check an invalid definition object due to a missing description correctly', done => {
      const res = __checkDefinitionObject({
        arg1: {
          type: 'String',
          alias: 'a',
          default: 'Hello world'
        }
      });

      expect(res).toBe(`The property \"description\" for your argument \"arg1\" is missing...`);
      done();
    });
  });
};