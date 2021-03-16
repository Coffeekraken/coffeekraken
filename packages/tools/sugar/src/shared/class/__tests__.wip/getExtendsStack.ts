module.exports = (__getExtendsStack) => {
  class MyClass {}
  class MyOtherClass extends MyClass {}
  class FinalClass extends MyOtherClass {}

  describe('sugar.js.class.getExtendsStack', () => {
    it('Should return the correct extends stack', () => {
      expect(__getExtendsStack(FinalClass)).toEqual([
        'MyOtherClass',
        'MyClass'
      ]);
    });

    it('Should return the correct extends stack from an instance', () => {
      expect(__getExtendsStack(new FinalClass())).toEqual([
        'MyOtherClass',
        'MyClass'
      ]);
    });
  });
};
