module.exports = (__getHtmlClassFromTagName) => {
    describe('sugar.js.string.getHtmlClassFromTagName', () => {
        it('Should get back the correct HTMLElement class from passed tags', (done) => {
            expect(__getHtmlClassFromTagName('a')).toBe(HTMLAnchorElement);
            expect(__getHtmlClassFromTagName('link')).toBe(HTMLLinkElement);
            done();
        });
    });
};
