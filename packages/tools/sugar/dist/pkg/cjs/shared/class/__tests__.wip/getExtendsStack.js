"use strict";
module.exports = (__getExtendsStack) => {
    class MyClass {
    }
    class MyOtherClass extends MyClass {
    }
    class FinalClass extends MyOtherClass {
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQyxNQUFNLE9BQU87S0FBRztJQUNoQixNQUFNLFlBQWEsU0FBUSxPQUFPO0tBQUc7SUFDckMsTUFBTSxVQUFXLFNBQVEsWUFBWTtLQUFHO0lBRXhDLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtZQUNqRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzVDLGNBQWM7Z0JBQ2QsU0FBUzthQUNWLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtZQUNsRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxjQUFjO2dCQUNkLFNBQVM7YUFDVixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=