"use strict";
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
