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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvc2VhcmNoL2hhbmRsZXJzL2RvY01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsdUVBQWlEO0FBQ2pELHlFQUFtRDtBQUNuRCw0Q0FBc0I7QUFDdEIsc0RBQTZCO0FBQzdCLDZFQUF1RDtBQUN2RCw4RUFBc0Q7QUFDdEQsaUZBQTJEO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUyxNQUFNLENBQUMsWUFBWSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3pDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxxQkFBYSxFQUFFLEdBQUcsY0FBYztRQUMxQyxNQUFNLEVBQUU7WUFDTixHQUFHLEVBQUUsWUFBWTtTQUNsQjtLQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixJQUFJLFFBQVEsR0FBRyw2QkFBbUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVELFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDO0tBQ3hDLENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUN4QixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDeEIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNqRSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsUUFBUSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7S0FDbkM7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUMvQyxrQkFBa0I7UUFD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