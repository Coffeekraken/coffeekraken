"use strict";
module.exports = function (__queryStringToObject) {
    describe('sugar.js.url.queryStringToObject', function () {
        it('Should correctly parse the passed query string', function () {
            expect(__queryStringToObject('?var1=value1&var2=value2')).toEqual({ var1: 'value1', var2: 'value2' });
        });
    });
};
//# sourceMappingURL=queryStringToObject.js.map