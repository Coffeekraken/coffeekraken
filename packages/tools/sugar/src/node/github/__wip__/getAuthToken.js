"use strict";
// @ts-nocheck
/**
 * @name        getAuthToken
 * @namespace           sugar.node.github
 * @type        Function
 * @status              beta
 *
 * Get back the authentification informations (username, token) setted using the 'setAuthToken' function
 *
 * @return          {Object}              Return back the auth token object formated like so : username, token
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const getAuthToken = require('@coffeekraken/node/github/getAuthToken');
 * console.log(getAuthToken()); // => { username: '...', token: '...' }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getAuthToken() {
    return global.githubAuthToken || false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXV0aFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QXV0aFRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFlBQVk7SUFDcEMsT0FBTyxNQUFNLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQztBQUN6QyxDQUFDLENBQUMifQ==