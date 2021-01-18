module.exports = (__getMethods) => {
  class MyClass {
    _settings = {
      hello: 'world'
    };
    constructor(name) {
      this._name = name;
    }
    testing(value) {
      this._plop = value;
    }
    plop(user) {}
  }
  const myInstance = new MyClass('coffeekraken');

  describe('sugar.js.class.getMethods', () => {
    it('Should return the correct methods list from an instance', () => {
      const res = __getMethods(myInstance);
      expect(res).toEqual(['constructor', 'plop', 'testing']);
    });
  });
};
