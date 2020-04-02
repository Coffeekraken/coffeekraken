const __isPlainObject = require('@coffeekraken/sugar/node/is/plainObject');
const __isPath = require('@coffeekraken/sugar/node/is/path');
const __fs = require('fs');

const __CoffeeCliSourceAdapter = require('./CoffeeCliSourceAdapter');

/**
 * @name                      CoffeeCliSources
 * @namespace                 terminal.coffeecli.node.classes
 * @type                      Class
 * 
 * This class handle the setted sources and allow to get the "coffeecli.config.js" files from them
 * 
 * @example                 js
 * const CoffeeCliSources = require('@coffeekraken/coffeecli/node/core/CoffeeCliSources');
 * const sources = new CoffeeCliSources();
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeCliSources {

  /**
   * @name                            _sources
   * @type                            Array
   * @private
   * 
   * Store the passed sources array
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _sources = [];

  /**
   * @name                            _selectedSource
   * @type                            Object
   * @private
   * 
   * Store the selected source. By default, this is the first source setted.
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _selectedSource = null;

  /**
   * @name                            constructor
   * @type                            Function
   * 
   * Construct the sources instance by passing to is the setted sources from the config
   * 
   * @param           {Array}           sources               The array of configured sources
   * 
   * @example         js
   * const sources = new CoffeeCliSources([{
   *    adapter: 'bitbucket',
   *    settings: {
   *      team: 'coffeekraken',
   *      filename: 'coffeecli.config.js'
   *    }
   * }]);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(sources) {

    // save the sources
    this._sources = sources;

    // check that all the sources are valid
    this._checkSources();

    // set the first source as selected one
    this._selectedSource = this._sources[Object.keys(this._sources)[0]];

  }

  /**
   * @name                          select
   * @type                          Function
   * 
   * This method allows you to select a source through which fetching the data
   * 
   * @param           {String}               name                   Specify the source name that you want to select. 
   * @return          {CoffeeCliSources}                            Return the CoffeeCliSources instance to maintain chainability
   * 
   * @example         js
   * const files = await sources.select('bitbucket').fetch();
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  select(name) {
    // check that the name exist
    if (!this._sources[name]) {
      throw new Error(`You try to select the source "${name}" but this source does not exists. Here's the list of sources available: ${Object.keys(this._sources).join(',')}`);
    }
    // set the source as selected one
    this._selectedSource = this._sources[name];
    // return the instance to maintain chainability
    return this;
  }

  /**
   * @name                          fetch
   * @type                          Function
   * 
   * This method take the selected source and proceed to the fetch request to get back the config files
   * 
   * @return          {Promise}                           Return a promise that will be resolved once the fetch process has finished. The value will be an Array of CoffeeCliFile instances
   * 
   * @example         js
   * const files = await sources.fetch();
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async fetch() {
    // proceed to the fetch request on the source
    return await this._selectedSource.adapter.fetch();
  }

  /**
   * @name                          _checkSources
   * @type                          Function
   * @private  
   * 
   * This method take all the passed sources and check that they are valid
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _checkSources() {

    // loop on the sources
    Object.keys(this._sources).forEach(sourceId => {

      const source = this._sources[sourceId];

      if (__isPlainObject(source)) {
        if (!source.adapter) {
          throw new Error(`When you set a CoffeeCli source using a plain Object, you need to specify the "adapter" property...`);
        }
        if (typeof source.adapter === 'string') {
          if (!__isPath(source.adapter, true)) {
            if (!__fs.existsSync(`${__dirname}/../sourcesAdapters/${source.adapter}.js`)) {
              throw new Error(`You have specified "${source.adapter}" as "adapter" setting for your source but this adapter does not exists...`);
            } else {
              source.adapter = new (require(`${__dirname}/../sourcesAdapters/${source.adapter}.js`))(source.settings || {});
            }
          } else {
            source.adapter = new (require(source.adapter))(source.settings || {});
          }
        }
      } else if (!source instanceof __CoffeeCliSourceAdapter) {
        throw new Error(`You have passed an object in your CoffeeCli sources that is not an instance of the CoffeeCliSourceAdapter class...`);
      }

    });

  }

}