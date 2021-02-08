"use strict";
// @ts-nocheck
var __deepMerge = require('../../../object/deepMerge');
/**
 * @name                              axiosInjector
 * @namespace           node.auth.injectors
 * @type                              Function
 *
 * This function take the axios config object and inject the auth headers, etc into it
 *
 * @param           {Object}                authInfo                The authentification info object
 * @param           {Object}                requestConfig           The request config object where to inject the auth info into
 * @return          {Object}                                        The request config object hooked
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function axiosInjector(authInfo, requestConfig) {
    switch (authInfo.type) {
        case 'basic':
        case 'bearer':
            requestConfig.headers = __deepMerge(requestConfig.headers || {}, authInfo.headers);
            break;
    }
    return requestConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3NJbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF4aW9zSW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsYUFBYSxDQUFDLFFBQVEsRUFBRSxhQUFhO0lBQzdELFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNyQixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssUUFBUTtZQUNYLGFBQWEsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUNqQyxhQUFhLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDM0IsUUFBUSxDQUFDLE9BQU8sQ0FDakIsQ0FBQztZQUNGLE1BQU07S0FDVDtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyJ9