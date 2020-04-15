module.exports = (__SLog, __SLogConsoleAdapter) => {

  describe('sugar.js.log.SLogConsoleAdapter', () => {

    const logger = new __SLog({
      adapters: [
        new __SLogConsoleAdapter()
      ]
    });

    logger.log('Hello world');
    logger.info('Hello world');
    logger.warn('Hello world');
    logger.debug('Hello world');
    logger.error('Hello world');

  });

}