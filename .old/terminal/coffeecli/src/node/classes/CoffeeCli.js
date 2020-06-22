const __SConfig = require('@coffeekraken/sugar/node/config/SConfig');

const __CoffeeCliSources = require('./CoffeeCliSources');

/**
 * @name                      CoffeeCli
 * @namespace                 terminal.coffeecli.node.core
 * @type                      Class
 * 
 * This is the main coffeecli class that handle the ui display, etc...
 * 
 * @example                 js
 * const CoffeeCli = require('@coffeekraken/coffeecli/node/core/CoffeeCli');
 * const coffee = nre CoffeeCli();
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeCli {

  /**
   * @name                        constructor
   * @type                        Function
   * 
   * Construct the coffeecli instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

    // create the CoffeeCli global object to access easily to some
    // features like config, etc...
    global.CoffeeCli = {};

    // init the config instance
    CoffeeCli.config = new __SConfig('coffeecli', {
      adapters: [{
        adapter: 'js',
        settings: {
          defaultConfigPath: `${__dirname}/../../../coffeecli.config.js`,
          appConfigPath: `${process.cwd()}/coffeecli.config.js`,
        }
      }]
    });

    // init the "sources" instance
    CoffeeCli.sources = new __CoffeeCliSources(CoffeeCli.config.get('sources'));

    (async () => {

      console.log(await CoffeeCli.sources.select('bitbucket').fetch());

    })();

  }

}