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
