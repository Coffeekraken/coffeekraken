"use strict";
module.exports = (__getMethods) => {
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
        plop(user) { }
    }
    const myInstance = new MyClass('coffeekraken');
    describe('sugar.js.class.getMethods', () => {
        it('Should return the correct methods list from an instance', () => {
            const res = __getMethods(myInstance);
            expect(res).toEqual(['constructor', 'plop', 'testing']);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUU7SUFDaEMsTUFBTSxPQUFPO1FBSVgsWUFBWSxJQUFJO1lBSGhCLGNBQVMsR0FBRztnQkFDVixLQUFLLEVBQUUsT0FBTzthQUNmLENBQUM7WUFFQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUs7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksSUFBRyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUvQyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1FBQ3pDLEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxHQUFHLEVBQUU7WUFDakUsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9