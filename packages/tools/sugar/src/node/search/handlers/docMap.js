"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const SSearchResultItem_1 = __importDefault(require("../SSearchResultItem"));
const search_query_parser_1 = __importDefault(require("search-query-parser"));
const SUrlAction_1 = __importDefault(require("../../action/browser/SUrlAction"));
/**
 * @name                search
 * @namespace           sugar.node.search.handlers
 * @type                Function
 *
 * This function is responsible of handling the docMap search
 * by filtering the docMap and send back the serch result json.
 *
 * @param         {String}        searchString        The searching string
 * @param         {Object}        [settings={}]       A settings object to configure your search process. Here's the available settings:
 * @return        {Promise}                         A promise that will be resolved with an array of SSearchResultItem object either as full instances, or in JSON format depending on the settings.format property
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function search(searchString, settings = {}) {
    settings = deepMerge_1.default({
        filePath: packageRoot_1.default() + '/docMap.json',
        action: {
            url: '/doc[path]'
        }
    }, settings);
    let queryObj = search_query_parser_1.default.parse(searchString.trim(), {
        keywords: ['name', 'namespace', 'path']
    });
    delete queryObj.offsets;
    delete queryObj.exclude;
    if (typeof queryObj !== 'object' || !Object.keys(queryObj).length) {
        queryObj = {};
        queryObj.namespace = searchString;
    }
    return new Promise((resolve, reject) => {
        // load the docmap
        if (!fs_1.default.existsSync(settings.filePath)) {
            throw new Error(`You try to make a research using the <primary>docMap</primary> search handler but it seems that your configuration point to a file that does not exists "<cyan>${settings.filePath}</cyan>"...`);
        }
        const docMap = require(settings.filePath);
        const fuse = new fuse_js_1.default(docMap, {
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            shouldSort: true,
            keys: Object.keys(queryObj)
        });
        const operators = [];
        Object.keys(queryObj).forEach((key) => {
            operators.push({
                [key]: queryObj[key]
            });
        });
        const pathsArray = [];
        const results = fuse
            .search({
            $and: operators
        })
            .map((item) => {
            return {
                ...item.item
            };
        })
            .filter((item) => {
            if (pathsArray.indexOf(item.path) === -1) {
                pathsArray.push(item.path);
                return true;
            }
            return false;
        })
            .map((item) => {
            let action;
            if (typeof settings.action === 'function') {
                action = settings.action(item);
            }
            else if (typeof settings.action === 'object') {
                action = new SUrlAction_1.default({
                    url: settings.action.url.replace('[path]', item.path),
                    target: '_self'
                });
            }
            return new SSearchResultItem_1.default(item.name, item.namespace, action, {});
        });
        // resolving the handler with the results array
        resolve(results);
    });
}
exports.default = search;
