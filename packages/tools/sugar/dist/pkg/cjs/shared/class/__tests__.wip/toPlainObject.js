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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxPQUFPO1FBSVgsWUFBWSxJQUFJO1lBSGhCLGNBQVMsR0FBRztnQkFDVixLQUFLLEVBQUUsT0FBTzthQUNmLENBQUM7WUFFQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUs7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO0tBQ0Y7SUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVCLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7UUFDNUMsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtZQUMzRSxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDMUIsU0FBUyxFQUFFO29CQUNULEtBQUssRUFBRSxPQUFPO2lCQUNmO2dCQUNELEtBQUssRUFBRSxjQUFjO2dCQUNyQixLQUFLLEVBQUUsT0FBTzthQUNmLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==