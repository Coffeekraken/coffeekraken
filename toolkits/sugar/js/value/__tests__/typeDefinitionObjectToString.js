"use strict";

module.exports = __typeDefinitionObjectToString => {
  describe('sugar.js.value.typeDefinitionObjectToString', () => {
    it('Should return the correct typeDefinitionObjectToString of the passed values', () => {
      expect(__typeDefinitionObjectToString(true)).toEqual('Boolean');
    });
  });
};