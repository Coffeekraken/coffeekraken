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
module.exports = search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLHVFQUFpRDtBQUNqRCx5RUFBbUQ7QUFDbkQsNENBQXNCO0FBQ3RCLHNEQUE2QjtBQUM3Qiw2RUFBdUQ7QUFDdkQsOEVBQXNEO0FBQ3RELGlGQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQVMsTUFBTSxDQUFDLFlBQVksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN6QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxRQUFRLEVBQUUscUJBQWEsRUFBRSxHQUFHLGNBQWM7UUFDMUMsTUFBTSxFQUFFO1lBQ04sR0FBRyxFQUFFLFlBQVk7U0FDbEI7S0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxRQUFRLEdBQUcsNkJBQW1CLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1RCxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQztLQUN4QyxDQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDeEIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ3hCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDakUsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFFBQVEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0tBQ25DO0lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDL0Msa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUNiLGtLQUFrSyxRQUFRLENBQUMsUUFBUSxhQUFhLENBQ2pNLENBQUM7U0FDSDtRQUNELE1BQU0sTUFBTSxHQUFHLHdEQUFhLFFBQVEsQ0FBQyxRQUFRLEdBQUMsQ0FBQztRQUUvQyxNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFNLENBQUMsTUFBTSxFQUFFO1lBQzlCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGtCQUFrQixFQUFFLENBQUM7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ3JCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUk7YUFDakIsTUFBTSxDQUFDO1lBQ04sSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1oseUJBQ0ssSUFBSSxDQUFDLElBQUksRUFDWjtRQUNKLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2YsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDeEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1osSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQ3pDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUksT0FBTyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsTUFBTSxHQUFHLElBQUksb0JBQVksQ0FBQztvQkFDeEIsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDckQsTUFBTSxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxJQUFJLDJCQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFFTCwrQ0FBK0M7UUFDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIn0=