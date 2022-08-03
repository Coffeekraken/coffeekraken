module.exports = (__toQueryString) => {
    describe('sugar.shared.object.toQueryString', () => {
        it('Should transformt the object into a correctly formatted query string', (done) => {
            const obj = {
                param1: 'hello',
                param2: 'world coco',
            };

            expect(__toQueryString(obj)).toBe(
                '?param1=hello&param2=world%20coco',
            );

            done();
        });
    });
};
