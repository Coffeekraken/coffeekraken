module.exports = (__SNavItem) => {
    describe('sugar.js.nav.SNavItem', () => {
        it('Should create and update a nav item correctly', (done) => {
            const navItem = new __SNavItem('myCoolItem', 'My Cool Item', 'scroll:#something', {
                target: '_blank'
            });
            expect(navItem.id).toBe('myCoolItem');
            expect(navItem.text).toBe('My Cool Item');
            expect(navItem.action).toBe('scroll:#something');
            expect(navItem.target).toBe('_blank');
            expect(navItem.toMarkdown()).toEqual('- [scroll:#something](My Cool Item)');
            done();
        });
    });
};
