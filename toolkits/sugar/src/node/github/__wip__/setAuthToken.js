/**
 * @name              setAuthToken
 * @namespace           node.github
 * @type               Function
 *
 * Set the github authentification token that will be used by all the sugar github related functions
 *
 * @param           {String}            username            The username to use as authentification
 * @param           {String}            token               The token generated on github.com
 *
 * @example       js
 * const setAuthToken = require('@coffeekraken/sugar/node/github/setAuthToken');
 * setAuthToken('olivierbossel', '3a182619e6cf6dd2bc1ec2ca98f80a9ee8e7eaf2');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setAuthToken(username, token) {
  // save the auth information globally
  global.githubAuthToken = {
    username,
    token
  };
};
