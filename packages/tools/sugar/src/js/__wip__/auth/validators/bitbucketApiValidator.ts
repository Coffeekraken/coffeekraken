// @ts-nocheck

const __axios = require('axios');

/**
 * @name                            bitbucketApiValidator
 * @namespace           node.auth
 * @type                            Function
 * @async
 *
 * Make sure the bitbucket api authentification has been made correctly
 *
 * @param           {Object}              authInfo            The authentification info
 * @return          {Promise}                                 true if ok, false (or error message) if it's not...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function bitbucketApiValidator(authInfo) {
  return new Promise(async (resolve, reject) => {
    const url = 'https://api.bitbucket.org/2.0/repositories';

    switch (authInfo.type) {
      case 'basic':
        __axios
          .get(url, {
            headers: authInfo.headers
          })
          .then((response) => {
            resolve(true);
          })
          .catch((e) => {
            resolve(`Your credentials have been declined. Please try again...`);
          });
        break;
      case 'bearer':
        __axios
          .get(url, {
            headers: authInfo.headers
          })
          .then((response) => {
            console.log('resp', response);
            process.exit();
            resolve(true);
          })
          .catch((e) => {
            resolve(`Your token has been declined. Please try again...`);
          });
        break;
    }
  });
};
