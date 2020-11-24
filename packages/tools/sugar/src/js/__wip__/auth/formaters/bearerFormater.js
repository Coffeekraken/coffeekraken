"use strict";
// @ts-nocheck
var __base64 = require('../../crypt/base64');
/**
 * @name                          bearerFormater
 * @namespace           node.auth.formaters
 * @type                          Function
 *
 * This function simply take the bearer auth infos (token) and return the formated auth object with the headers, etc...
 *
 * @param           {Object}            authInfo            The authentification informations (username, password)
 * @return          {Object}                                The formated auth infos object with headers, etc...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function bearerFormater(authInfo) {
    // build the formated auth object
    return {
        token: authInfo.token,
        headers: {
            Authorization: "Bearer " + authInfo.token
        }
    };
};
