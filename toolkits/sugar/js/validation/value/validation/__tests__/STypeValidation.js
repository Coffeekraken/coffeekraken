"use strict";

module.exports = __STypeValidation => {
  describe('sugar.js.validation.value.validation.STypeValidation', () => {
    it('Should validate the passed value correctly', () => {
      expect(__STypeValidation.apply('oco', 'Boolean')).toBe("This value has to be of type <yellow>Boolean</yellow> and you've passed \"<red>oco\"</red> which is of type \"<red>String</red>\"");
      expect(__STypeValidation.apply('oco', 'String')).toBe(true);
    });
  });
};