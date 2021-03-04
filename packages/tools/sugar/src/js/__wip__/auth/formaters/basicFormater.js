"use strict";
// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNGb3JtYXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljRm9ybWF0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUMsUUFBUTtJQUM5QyxtQ0FBbUM7SUFDbkMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDN0IsUUFBUSxDQUFDLFFBQVEsU0FBSSxRQUFRLENBQUMsUUFBVSxDQUM1QyxDQUFDO0lBRUYsaUNBQWlDO0lBQ2pDLE9BQU87UUFDTCxLQUFLLEVBQUUsV0FBVztRQUNsQixPQUFPLEVBQUU7WUFDUCxhQUFhLEVBQUUsV0FBUyxXQUFhO1NBQ3RDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9