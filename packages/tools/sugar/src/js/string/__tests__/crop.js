module.exports = (__crop) => {
    describe('sugar.js.string.crop', () => {
        it('Should process the passed string correctly', done => {
            expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                splitWords: true
            })).toBe('<span>Lorem Ipsum is</span> simply dum...');
            expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                splitWords: false,
                chars: '_-_'
            })).toBe('<span>Lorem Ipsum is</span> simply_-_');
            done();
        });
    });
};
