const __SBitbucketApi = require('@coffeekraken/sugar/node/api/SBitbucketApi');

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

    // init new bitbucket api
    this._api = new __SBitbucketApi('cli');

    // (async () => {
    //   // check that we have already the bitbucket auth tokens
    //   const auth = await __auth.get('bitbucket');
    // })();


    // const username = 'obossel';
    // const password = 'Kb8ybwU5yBxMWwmx4Jfk'; // 
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    // const authHeaders = {
    //   headers: {
    //     'Authorization': `Basic ${token}`
    //   }
    // };

    // const cache = new __SCache('cli')

    // const res = await __axios.get('https://api.bitbucket.org/2.0/repositories/buzzbrothers', {
    //   params: {
    //     pagelen: 100
    //   },
    //   ...authHeaders
    // });

    // if (res.data.values) {
    //   // res.data.values.forEach(repo => {
    //   let cliFile = __axios.get(`https://api.bitbucket.org/2.0/teams/buzzbrothers/search/code?search_query=cli.config.js ext:js`, {
    //     ...authHeaders
    //   }).catch(error => {
    //     // handle error
    //     console.log(error);
    //   }).then(res => {
    //     // console.log(res.data.values[0].file.links);
    //     // loop on all the search results to get the files content
    //     if (res && res.data.values) {
    //       let filesQueries = [];
    //       res.data.values.forEach(file => {
    //         filesQueries.push(__axios.get(file.file.links.self.href, {
    //           ...authHeaders
    //         }).then(fileRes => {
    //           console.log(fileRes);
    //         }));
    //       });
    //       Promise.all(filesQueries).then(() => {
    //         console.log('END');
    //       });
    //     }

    //   });

    // });
    // Promise.all(requests).then(() => {
    //   console.log(cliFilesArray);
    // });
  }

    // console.log(res.data);

    return {};


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