const __SBitbucketApi = require('@coffeekraken/sugar/node/api/SBitbucketApi');
const __extension = require('@coffeekraken/sugar/node/fs/extension')

const __CoffeeCliFile = require('../classes/CoffeeCliFile');
const __CoffeeCliSourceAdapter = require('../classes/CoffeeCliSourceAdapter');

/**
 * @name                          bitbucket
 * @namespace                     cli.node.api
 * @type                          Class
 * 
 * Give a class that let you interact with the bitbucket api
 * 
 * @example                   js
 * const BitbucketApi = require('@coffeekraken/cli/node/api/bitbucket');
 * const bitbucket = new BitbucketApi('coffeekraken');
 * bitbucket.repos().then(list => {
 *    // do something with the list...
 * });
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeCliBitbucketSourceAdapter extends __CoffeeCliSourceAdapter {

  /**
   * @name                          constructor
   * @type                          Function
   * 
   * Construct the bitbucket source adapter
   * 
   * @param         {Object}              [settings={}]             The adapter settings. Here's the list of available settings:
   * - team (null) {String}: Specify a bitbucket team name in which to scope the research
   * - user (null) {String}: Specify a bitbucket username in which to scope the research
   * - file (coffeecli.config.js) {String}: Specify the name of the "CoffeeCli" file to search for
   * 
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(settings);

    // check the settings
    if (!this._settings.user && !this._settings.team) {
      throw new Error(`You have setted the "bitbucket" adapter as CoffeeCli source but this adapter need either a "team" or a "user" settings specified in order to work...`);
    }

    // init the bitbucket api instance
    this._api = new __SBitbucketApi({
      cache: {
        ttl: '1d'
      },
      auth: {
        type: 'basic'
      }
    });

  }

  /**
   * @name                      fetch
   * @type                      Function
   * @async
   * 
   * This method will use the adapter settings to fetch the correct files from bitbucket
   * 
   * @return          {Promise}                 A promise that will be resolved with an Array of CoffeeCliFile instances
   * 
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async fetch() {

    // build the correct api request url
    let requestUrl = ``;

    // check is we have a user specified
    if (this._settings.user) {
      requestUrl += `/users/${this._settings.user}/search/code`;
    } else if (this._settings.team) {
      requestUrl += `/teams/${this._settings.team}/search/code`;
    }

    // process to the request
    const files = await this._api.get(requestUrl, {
      params: {
        search_query: `${this._settings.file} ext:${__extension(this._settings.file)}`,
        pagelen: 1000
      }
    });

    const filesPromises = [];
    const filesInstances = [];

    // loop on each results to get the content of the file
    files.data.values.forEach(file => {
      const request = this._api.get(file.file.links.self.href);
      filesPromises.push(request);
      request.then(response => {
        filesInstances.push(new __CoffeeCliFile(response.data));
      });
    });

    await Promise.all(filesPromises);

    // return the array of files
    return filesInstances;

  }

}