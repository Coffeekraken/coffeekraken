module.exports = (__SRequiredValidation) => {
  describe('sugar.js.validation.value.validation.SRequiredValidation', () => {
    it('Should validate the passed value correctly', () => {
      expect(__SRequiredValidation.apply(null)).toBe(false);
    });
  });
};
