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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9QbGFpbk9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvUGxhaW5PYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtJQUNuQyxNQUFNLE9BQU87UUFJWCxZQUFZLElBQUk7WUFIaEIsY0FBUyxHQUFHO2dCQUNWLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQztZQUVBLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSztZQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7S0FDRjtJQUNELE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUIsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtRQUM1QyxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1lBQzNFLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVoRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUMxQixTQUFTLEVBQUU7b0JBQ1QsS0FBSyxFQUFFLE9BQU87aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9