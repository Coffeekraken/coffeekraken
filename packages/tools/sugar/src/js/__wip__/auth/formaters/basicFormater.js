// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __base64 = require('../../../crypt/base64');
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
        var tokenString = __base64.encrypt(authInfo.username + ":" + authInfo.password);
        // build the formated auth object
        return {
            token: tokenString,
            headers: {
                Authorization: "Basic " + tokenString
            }
        };
    };
});
//# sourceMappingURL=module.js.map