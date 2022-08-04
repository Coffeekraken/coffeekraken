"use strict";
module.exports = (__standardizeJson) => {
    describe('sugar.js.nav.SNav', () => {
        it('Should standardize the passed json', (done) => {
            expect(__standardizeJson({
                contributors: [
                    {
                        name: 'Olivier Bossel',
                        email: 'olivier.bossel@gmail.com',
                        url: 'https://olivierbossel.com'
                    },
                    'Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)'
                ],
                author: 'Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) '
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hELE1BQU0sQ0FDSixpQkFBaUIsQ0FBQztnQkFDaEIsWUFBWSxFQUFFO29CQUNaO3dCQUNFLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLEdBQUcsRUFBRSwyQkFBMkI7cUJBQ2pDO29CQUNELHFFQUFxRTtpQkFDdEU7Z0JBQ0QsTUFBTSxFQUNKLHNFQUFzRTthQUN6RSxDQUFDLENBQ0gsQ0FBQyxPQUFPLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaO3dCQUNFLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLEdBQUcsRUFBRSwyQkFBMkI7cUJBQ2pDO29CQUNEO3dCQUNFLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7d0JBQ2pDLEdBQUcsRUFBRSwyQkFBMkI7cUJBQ2pDO2lCQUNGO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsMEJBQTBCO29CQUNqQyxHQUFHLEVBQUUsMkJBQTJCO2lCQUNqQzthQUNGLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9