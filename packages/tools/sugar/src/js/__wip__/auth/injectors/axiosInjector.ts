const __deepMerge = require('../../../object/deepMerge');

/**
 * @name                              axiosInjector
 * @namespace           node.auth.injectors
 * @type                              Function
 *
 * This function take the axios config object and inject the auth headers, etc into it
 *
 * @param           {Object}                authInfo                The authentification info object
 * @param           {Object}                requestConfig           The request config object where to inject the auth info into
 * @return          {Object}                                        The request config object hooked
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function axiosInjector(authInfo, requestConfig) {
  switch (authInfo.type) {
    case 'basic':
    case 'bearer':
      requestConfig.headers = __deepMerge(
        requestConfig.headers || {},
        authInfo.headers
      );
      break;
  }

  return requestConfig;
};
