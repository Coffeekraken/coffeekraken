module.exports = (__SLog, __SLogMailAdapter) => {

  describe('sugar.js.log.SLogMailAdapter', () => {

    const logger = new __SLog({
      adapters: {
        mail: new __SLogMailAdapter({
          secureToken: '811624db-3436-42be-adb1-4b44c2d71123',
          to: 'olivier.bossel@gmail.com',
          from: 'info@coffeekraken.io'
        })
      }
    });

    logger.log('Hello world');

    it('Should send the mail correctly', done => {

      setTimeout(() => {
        done();
      }, 10000);
    });

  });

}