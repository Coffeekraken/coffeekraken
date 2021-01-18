"use strict";
module.exports = function (__standardizeJson) {
    describe('sugar.js.nav.SNav', function () {
        it('Should standardize the passed json', function (done) {
            expect(__standardizeJson({
                contributors: [
                    {
                        name: 'Olivier Bossel',
                        email: 'olivier.bossel@gmail.com',
                        url: 'https://olivierbossel.com'
                    },
                    'Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)'
                ],
                author: 'Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) '
            })).toEqual({
                contributors: [
                    {
                        name: 'Olivier Bossel',
                        email: 'olivier.bossel@gmail.com',
                        url: 'https://olivierbossel.com'
                    },
                    {
                        name: 'Olivier Bossel',
                        email: 'olivier.bossel@gmail.com',
                        url: 'https://olivierbossel.com'
                    }
                ],
                author: {
                    name: 'Olivier Bossel',
                    email: 'olivier.bossel@gmail.com',
                    url: 'https://olivierbossel.com'
                }
            });
            done();
        });
    });
};
//# sourceMappingURL=standardizeJson.js.map