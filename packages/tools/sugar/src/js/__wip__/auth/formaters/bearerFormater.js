"use strict";
// @ts-nocheck
const __base64 = require('../../crypt/base64');
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
            Authorization: `Bearer ${authInfo.token}`
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhcmVyRm9ybWF0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiZWFyZXJGb3JtYXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBQyxRQUFRO0lBQy9DLGlDQUFpQztJQUNqQyxPQUFPO1FBQ0wsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1FBQ3JCLE9BQU8sRUFBRTtZQUNQLGFBQWEsRUFBRSxVQUFVLFFBQVEsQ0FBQyxLQUFLLEVBQUU7U0FDMUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=