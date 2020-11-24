"use strict";
module.exports = (__toPlainObject) => {
    class MyClass {
        constructor(name) {
            this._settings = {
                hello: 'world'
            };
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
