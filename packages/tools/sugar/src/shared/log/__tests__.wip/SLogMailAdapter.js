"use strict";
// TODO check the smtp connection...
module.exports = (__SLog, __SLogMailAdapter) => {
    describe('sugar.js.log.SLogMailAdapter', () => {
        const logger = new __SLog({
            adapters: {
                mail: new __SLogMailAdapter({
                    // host: 'smtp.gmail.com',
                    // username: 'olivier.bossel@gmail.com',
                    // password: '',
                    secureToken: '2bafe154-7234-448b-8501-3da40dbf77cc',
                    to: 'olivier.bossel@gmail.com',
                    from: 'info@coffeekraken.io'
                })
            }
        });
        logger.log('Hello world');
        it('Should send the mail correctly', done => {
            // setTimeout(() => {
            //   done();
            // }, 3000);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQ0FBb0M7QUFFcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxFQUFFO0lBRTdDLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7UUFFNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDeEIsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxJQUFJLGlCQUFpQixDQUFDO29CQUMxQiwwQkFBMEI7b0JBQzFCLHdDQUF3QztvQkFDeEMsZ0JBQWdCO29CQUNoQixXQUFXLEVBQUUsc0NBQXNDO29CQUNuRCxFQUFFLEVBQUUsMEJBQTBCO29CQUM5QixJQUFJLEVBQUUsc0JBQXNCO2lCQUM3QixDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUUxQyxxQkFBcUI7WUFDckIsWUFBWTtZQUNaLFlBQVk7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=