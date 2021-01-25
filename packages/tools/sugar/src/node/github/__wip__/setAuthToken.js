"use strict";
// @ts-nocheck
/**
 * @name              setAuthToken
 * @namespace           sugar.node.github
 * @type               Function
 * @beta
 *
 * Set the github authentification token that will be used by all the sugar github related functions
 *
 * @param           {String}            username            The username to use as authentification
 * @param           {String}            token               The token generated on github.com
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const setAuthToken = require('@coffeekraken/sugar/node/github/setAuthToken');
 * setAuthToken('olivierbossel', '3a182619e6cf6dd2bc1ec2ca98f80a9ee8e7eaf2');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setAuthToken(username, token) {
    // save the auth information globally
    global.githubAuthToken = {
        username,
        token
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0QXV0aFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0QXV0aFRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUs7SUFDcEQscUNBQXFDO0lBQ3JDLE1BQU0sQ0FBQyxlQUFlLEdBQUc7UUFDdkIsUUFBUTtRQUNSLEtBQUs7S0FDTixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=