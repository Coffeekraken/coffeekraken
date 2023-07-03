"use strict";
module.exports = (__methodExists) => {
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
    myInstance.testing('hello');
    describe('sugar.js.class.methodExists', () => {
        it('Should return true if all the passed methods exists', () => {
            expect(__methodExists(myInstance, 'testing', 'plop')).toBe(true);
        });
        it('Should return an array of missing methods if some passed methods does not exists', () => {
            expect(__methodExists(myInstance, 'testing', 'plop', 'coco')).toEqual([
                'coco'
            ]);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7SUFDbEMsTUFBTSxPQUFPO1FBSVgsWUFBWSxJQUFJO1lBSGhCLGNBQVMsR0FBRztnQkFDVixLQUFLLEVBQUUsT0FBTzthQUNmLENBQUM7WUFFQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUs7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksSUFBRyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDM0MsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtZQUM3RCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsa0ZBQWtGLEVBQUUsR0FBRyxFQUFFO1lBQzFGLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BFLE1BQU07YUFDUCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=