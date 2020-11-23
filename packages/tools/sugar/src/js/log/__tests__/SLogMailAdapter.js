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
