const __base64 = require('../../../crypt/base64');
/**
 * @name                          basicFormater
 * @namespace           node.auth.formaters
 * @type                          Function
 *
 * This function simply take the basic auth infos (username, password) and return the formated auth object with the headers, etc...
 *
 * @param           {Object}            authInfo            The authentification informations (username, password)
 * @return          {Object}                                The formated auth infos object with headers, etc...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function basicFormater(authInfo) {
    // build the username:password info
    let tokenString = __base64.encrypt(`${authInfo.username}:${authInfo.password}`);
    // build the formated auth object
    return {
        token: tokenString,
        headers: {
            Authorization: `Basic ${tokenString}`
        }
    };
};
