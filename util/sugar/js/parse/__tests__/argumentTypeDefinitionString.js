"use strict";

module.exports = __argumentTypeDefinitionString => {
  describe('sugar.js.parse.argumentTypeDefinitionString', () => {
    it('Should parse these arguments types definitions correctly', () => {
      const res1 = __argumentTypeDefinitionString('Array<String>|Object|Array<Boolean>');

      expect(res1).toEqual([{
        type: 'array',
        of: [{
          type: 'string',
          of: null
        }]
      }, {
        type: 'object',
        of: null
      }, {
        type: 'array',
        of: [{
          type: 'boolean',
          of: null
        }]
      }]);

      const res2 = __argumentTypeDefinitionString('Array|Object|Array<Boolean|Number>');

      expect(res2).toEqual([{
        type: 'array',
        of: null
      }, {
        type: 'object',
        of: null
      }, {
        type: 'array',
        of: [{
          type: 'boolean',
          of: null
        }, {
          type: 'number',
          of: null
        }]
      }]);
    });
  });
};