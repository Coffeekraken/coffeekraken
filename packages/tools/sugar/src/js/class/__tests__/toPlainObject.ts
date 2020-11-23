module.exports = (__toPlainObject) => {
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
  }
  const myInstance = new MyClass('coffeekraken');
  myInstance.testing('hello');

  describe('sugar.js.class.toPlainObject', () => {
    it('Should convert a simple custom class instance into a plain object', () => {
      const plainObject = __toPlainObject(myInstance);

      expect(plainObject).toEqual({
        _settings: {
          hello: 'world'
        },
        _name: 'coffeekraken',
        _plop: 'hello'
      });
    });
  });
};
