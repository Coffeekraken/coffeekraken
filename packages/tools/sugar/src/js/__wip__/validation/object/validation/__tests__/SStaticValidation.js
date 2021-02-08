"use strict";
module.exports = function (__SStaticValidation) {
    describe('sugar.js.validation.object.validation.SStaticValidation', function () {
        it('Should validate the passed value correctly', function () {
            var MyClass = /** @class */ (function () {
                function MyClass() {
                    this.plop = 'yop';
                }
                MyClass.coco = 'hello';
                return MyClass;
            }());
            expect(__SStaticValidation.apply('hello', MyClass, 'coco')).toBe(true);
            expect(__SStaticValidation.apply('yop', MyClass, 'plop')).toBe("The passed \"<yellow>plop</yellow>\" property has to be a <green>static</green> one");
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFDLG1CQUFtQjtJQUNuQyxRQUFRLENBQUMseURBQXlELEVBQUU7UUFDbEUsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQy9DO2dCQUFBO29CQUVFLFNBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztnQkFGUSxZQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUV4QixjQUFDO2FBQUEsQUFIRCxJQUdDO1lBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDNUQscUZBQXFGLENBQ3RGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=