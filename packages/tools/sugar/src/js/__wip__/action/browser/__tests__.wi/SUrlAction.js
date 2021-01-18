"use strict";
module.exports = function (__SUrlAction) {
    describe('sugar.js.action.SUrlAction', function () {
        it('Should return the correct JSON object', function () {
            var action = new __SUrlAction({
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
//# sourceMappingURL=SUrlAction.js.map