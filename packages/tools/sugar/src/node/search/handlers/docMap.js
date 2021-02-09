"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
 * @status              wip
 *
 * This function is responsible of handling the docMap search
 * by filtering the docMap and send back the serch result json.
 *
 * @param         {String}        searchString        The searching string
 * @param         {Object}        [settings={}]       A settings object to configure your search process. Here's the available settings:
 * @return        {Promise}                         A promise that will be resolved with an array of SSearchResultItem object either as full instances, or in JSON format depending on the settings.format property
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
    return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        // load the docmap
        if (!fs_1.default.existsSync(settings.filePath)) {
            throw new Error(`You try to make a research using the <primary>docMap</primary> search handler but it seems that your configuration point to a file that does not exists "<cyan>${settings.filePath}</cyan>"...`);
        }
        const docMap = yield Promise.resolve().then(() => __importStar(require(settings.filePath)));
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
            return Object.assign({}, item.item);
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
    }));
}
exports.default = search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCx1RUFBaUQ7QUFDakQseUVBQW1EO0FBQ25ELDRDQUFzQjtBQUN0QixzREFBNkI7QUFDN0IsNkVBQXVEO0FBQ3ZELDhFQUFzRDtBQUN0RCxpRkFBMkQ7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxZQUFZLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDekMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsUUFBUSxFQUFFLHFCQUFhLEVBQUUsR0FBRyxjQUFjO1FBQzFDLE1BQU0sRUFBRTtZQUNOLEdBQUcsRUFBRSxZQUFZO1NBQ2xCO0tBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksUUFBUSxHQUFHLDZCQUFtQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUQsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUM7S0FDeEMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ3hCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUN4QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ2pFLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztLQUNuQztJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQy9DLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFR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