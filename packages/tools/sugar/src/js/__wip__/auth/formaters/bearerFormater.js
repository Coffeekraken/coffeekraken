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
});
//# sourceMappingURL=module.js.map