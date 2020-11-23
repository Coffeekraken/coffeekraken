module.exports = (__SUrlAction) => {
    describe('sugar.js.action.SUrlAction', () => {
        it('Should return the correct JSON object', () => {
            const action = new __SUrlAction({
                target: '_blank',
                url: 'https://google.com'
            });
            expect(action.toJson()).toEqual({
                type: 'browser.url',
                descriptorObj: { target: '_blank', url: 'https://google.com' },
                settings: {}
            });
        });
    });
};
