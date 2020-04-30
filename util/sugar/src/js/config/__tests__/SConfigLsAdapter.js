module.exports = (__SConfig, __SConfigLsAdapter) => {
  const config = new __SConfig('myCoolConfig', {
    adapters: [
      new __SConfigLsAdapter({
        name: 'something',
        defaultConfig: {
          adapter: 'ls',
          joy: {
            hello: 'world'
          }
        }
      })
    ],
    allowNew: true
  });

  describe('sugar.js.config.adapters.SConfigLsAdapter', () => {
    it('Should load, set, save and get correctly the config from the localStorage', async (done) => {
      config.set('something.cool', 'Hello world');

      config.load();

      expect(config.get('something')).toEqual({ cool: 'Hello world' });

      done();
    });
  });
};
