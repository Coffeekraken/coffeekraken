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
