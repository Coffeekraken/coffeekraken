"use strict";
module.exports = (__SStaticValidation) => {
    describe('sugar.js.validation.object.validation.SStaticValidation', () => {
        it('Should validate the passed value correctly', () => {
            class MyClass {
                constructor() {
                    this.plop = 'yop';
                }
            }
            MyClass.coco = 'hello';
            expect(__SStaticValidation.apply('hello', MyClass, 'coco')).toBe(true);
            expect(__SStaticValidation.apply('yop', MyClass, 'plop')).toBe(`The passed \"<yellow>plop</yellow>\" property has to be a <green>static</green> one`);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7SUFDdkMsUUFBUSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUN2RSxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO1lBQ3BELE1BQU0sT0FBTztnQkFBYjtvQkFFRSxTQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNmLENBQUM7O1lBRlEsWUFBSSxHQUFHLE9BQU8sQ0FBQztZQUl4QixNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM1RCxxRkFBcUYsQ0FDdEYsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==