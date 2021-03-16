"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("object/deepMerge"));
const SApi_1 = __importDefault(require("SApi"));
const node_machine_id_1 = require("node-machine-id");
/**
 * @name                            SBitbucketApi
 * @namespace           sugar.node.api
 * @type                            Class
 *
 * Simple bitbucket api class that let you make some requests to the bitbucket services with ease
 *
 * @example           js
 * const bitbucketApi = new SBitbucketApi('bitbucket');
 * const repos = await bitbucketApi.get('repositories');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBitbucketApi extends SApi_1.default {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SBitbucketApi instance
     *
     * @param           {String}                name                  The name of this SBitbucketApi instance
     * @param           {Object}                [settings={}]
     * An object of settings to configure this SBitbucketApi instance. Here's the list of available settings:
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // init SApi instance
        super(deepMerge_1.default({
            name: `SBitbucketApi-${node_machine_id_1.machineIdSync()}`,
            baseUrl: 'https://api.bitbucket.org/2.0',
            auth: {
                title: 'Bitbucket API Auth',
                info: 'Log in with your Bitbucket credentials...',
                type: 'basic',
                validator: 'bitbucketApi'
            }
        }, settings));
    }
}
exports.default = SBitbucketApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JpdGJ1Y2tldEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL19fd2lwX18vYXBpL1NCaXRidWNrZXRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsaUVBQTJDO0FBRTNDLGdEQUEwQjtBQUUxQixxREFBK0Q7QUFFL0Q7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBcUIsYUFBYyxTQUFRLGNBQU07SUFDL0M7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLHFCQUFxQjtRQUNyQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxpQkFBaUIsK0JBQVcsRUFBRSxFQUFFO1lBQ3RDLE9BQU8sRUFBRSwrQkFBK0I7WUFDeEMsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLElBQUksRUFBRSwyQ0FBMkM7Z0JBQ2pELElBQUksRUFBRSxPQUFPO2dCQUNiLFNBQVMsRUFBRSxjQUFjO2FBQzFCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBL0JELGdDQStCQyJ9