module.exports = (__constructorName) => {
    describe('sugar.shared.object.constructorName', () => {
        it('Should get the constructor name correctly', () => {
            class MyCoolClass {}
            const instance = new MyCoolClass();

            expect(__constructorName(instance)).toBe('MyCoolClass');
        });
    });
};
