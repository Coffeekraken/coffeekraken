"use strict";
module.exports = (__parseAuthorString) => {
    describe('sugar.js.npm.parseAuthorString', () => {
        it('Should parse the passed author string correctly', (done) => {
            expect(__parseAuthorString('Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) ')).toEqual({
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                url: 'https://olivierbossel.com'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtJQUN2QyxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1FBQzlDLEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdELE1BQU0sQ0FDSixtQkFBbUIsQ0FDakIsc0VBQXNFLENBQ3ZFLENBQ0YsQ0FBQyxPQUFPLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsR0FBRyxFQUFFLDJCQUEyQjthQUNqQyxDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==