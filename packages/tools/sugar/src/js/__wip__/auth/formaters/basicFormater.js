"use strict";
// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNGb3JtYXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljRm9ybWF0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxhQUFhLENBQUMsUUFBUTtJQUM5QyxtQ0FBbUM7SUFDbkMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDaEMsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FDNUMsQ0FBQztJQUVGLGlDQUFpQztJQUNqQyxPQUFPO1FBQ0wsS0FBSyxFQUFFLFdBQVc7UUFDbEIsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLFNBQVMsV0FBVyxFQUFFO1NBQ3RDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9