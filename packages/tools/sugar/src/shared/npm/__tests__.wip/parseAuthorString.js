"use strict";
module.exports = (__parseAuthorString) => {
    describe('sugar.js.npm.parseAuthorString', () => {
        it('Should parse the passed author string correctly', (done) => {
            expect(__parseAuthorString('Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) ')).toEqual({
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                url: 'https://olivierbossel.com'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBdXRob3JTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUF1dGhvclN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7SUFDdkMsUUFBUSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxFQUFFLENBQUMsaURBQWlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3RCxNQUFNLENBQ0osbUJBQW1CLENBQ2pCLHdFQUF3RSxDQUN6RSxDQUNGLENBQUMsT0FBTyxDQUFDO2dCQUNSLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLEdBQUcsRUFBRSwyQkFBMkI7YUFDakMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=