// @ts-nocheck

const __request = require('request');
const __getAuthToken = require('./getAuthToken');

/**
 * @name            listFolder
 * @namespace           sugar.node.github
 * @type            Function
 * @status              beta
 *
 * List a github folder and return the JSON formated github API response
 *
 * @param         {String}            repo            The repository name that you want to list the folder in
 * @param         {String}            [path='']       The path inside the repository to the folder that you want to list
 * @return        {Promise}                           A promise that will be resolved with the JSON as parameter, or rejected with the error
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const listFolder = require('@coffeekraken/node/github/listFolder');
 * listFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
 *    console.log('response', response);
 * }).catch((error) => {});
 *
 * @see           https://www.npmjs.com/package/request
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function (repo, path = '') {
  return new Promise(({ resolve, reject }) => {
    const authToken = __getAuthToken();

    const options = {
      url: `https://api.github.com/repos/${repo}/contents/${path}`,
      headers: {
        'User-Agent': 'coffeekraken-sugar-node-github-listFolder',
        Authorization: `token ${authToken.token}`
      }
    };

    __request(options, async (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(JSON.parse(body));
    });
  });
};
