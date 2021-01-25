"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __request = require('request');
const __getAuthToken = require('./getAuthToken');
/**
 * @name            listFolder
 * @namespace           sugar.node.github
 * @type            Function
 * @beta
 *
 * List a github folder and return the JSON formated github API response
 *
 * @param         {String}            repo            The repository name that you want to list the folder in
 * @param         {String}            [path='']       The path inside the repository to the folder that you want to list
 * @return        {Promise}                           A promise that will be resolved with the JSON as parameter, or rejected with the error
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const listFolder = require('@coffeekraken/node/github/listFolder');
 * listFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
 *    console.log('response', response);
 * }).catch((error) => {});
 *
 * @see           https://www.npmjs.com/package/request
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function (repo, path = '') {
    return new Promise(({ resolve, reject }) => {
        const authToken = __getAuthToken();
        const options = {
            url: `https://api.github.com/repos/${repo}/contents/${path}`,
            headers: {
                'User-Agent': 'coffeekraken-sugar-node-github-listFolder',
                Authorization: `token ${authToken.token}`
            }
        };
        __request(options, (error, response, body) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(body));
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEZvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3RGb2xkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO0lBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHO1lBQ2QsR0FBRyxFQUFFLGdDQUFnQyxJQUFJLGFBQWEsSUFBSSxFQUFFO1lBQzVELE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUUsMkNBQTJDO2dCQUN6RCxhQUFhLEVBQUUsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO2FBQzFDO1NBQ0YsQ0FBQztRQUVGLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2pELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1I7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9