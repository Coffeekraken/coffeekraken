// const { Bitbucket } = require('bitbucket');
const __auth = require('../utilities/auth');

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
module.exports = class BitbucketApi {

  /**
   * @name                          constructor
   * @type                          Function
   * @constructor
   * 
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(workspace = null) {
    // save the workspace
    this._workspace = workspace;

    (async () => {
      // check that we have already the bitbucket auth tokens
      const auth = await __auth.get('bitbucket');
    })();
  }

  /**
   * @name                            repos
   * @type                            Function
   * 
   * Return a promise that will be resolved with the repositories list
   * 
   * @return          {Promise}                   A promise that will be resolved once the repositories have been fetched
   * 
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async repos() {

  }



}