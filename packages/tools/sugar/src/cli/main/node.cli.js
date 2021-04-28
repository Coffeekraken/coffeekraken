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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_in_files_1 = __importDefault(require("find-in-files"));
const path_1 = __importDefault(require("path"));
const writeFileSync_1 = __importDefault(require("../../node/fs/writeFileSync"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const parse_1 = __importDefault(require("../../node/docblock/parse"));
const includes_1 = __importDefault(require("../../node/string/includes"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = parseArgs_1.default(stringArgs, {
        definition: {
            source: {
                type: 'String',
                alias: 's',
                default: `${app_root_path_1.default.path}/src/node`
            },
            destination: {
                type: 'String',
                alias: 'd',
                default: `${app_root_path_1.default.path}/node.js`
            },
            ignore: {
                type: 'String',
                alias: 'i',
                default: `__tests__,__wip__`
            }
        }
    });
    const itemsArray = [
        `
  require('module-alias/register');
const __ensureExists = require('@coffeekraken/sugar/node/object/ensureExists');
const api = {};
  `
    ];
    const stackFn = {};
    const stack = {};
    const files = yield find_in_files_1.default.find('@namespace', args.source, '.js$');
    for (let i = 0; i < Object.keys(files).length; i++) {
        const filepath = Object.keys(files)[i];
        if (includes_1.default(filepath, args.ignore))
            continue;
        // let fileContent = __fs.readFileSync(filepath).toString();
        // parse the file docblocks
        const docObj = parse_1.default(filepath, {
            preprocessor: (blockString) => {
                blockString = blockString.replace('sugar.js', 'sugar.node');
                blockString = blockString.replace('Sugar.js', 'Sugar.node');
                blockString = blockString.replace('sugar/js/', 'sugar/node/');
                return blockString;
            }
        })[0];
        const relativeFilePath = path_1.default.relative(args.destination.split('/').slice(0, -1).join('/'), docObj._.filepath);
        // check the type of the parsed file
        switch (docObj.type.toLowerCase()) {
            case 'function':
                itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name}', null);
api.${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name} = (...args) => {
  return require('./${relativeFilePath}').call(null, ...args);
};
        `);
                break;
            case 'class':
            default:
                itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name}', null);
Object.defineProperty(api.${docObj.namespace.split('.').slice(1).join('.')}, '${docObj.name}', {
  get: function() {
    return require('./${relativeFilePath}');
  }
});
          `);
                break;
        }
    }
    // export the API
    itemsArray.push(`module.exports = api;`);
    writeFileSync_1.default(args.destination, itemsArray.join('\n'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub2RlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFHZCxrRUFBbUM7QUFDbkMsZ0RBQTBCO0FBQzFCLGdGQUEwRDtBQUUxRCxrRUFBc0M7QUFDdEMseUVBQW1EO0FBQ25ELHNFQUFnRDtBQUNoRCwwRUFBb0Q7QUFFcEQsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxJQUFJLEdBQUcsbUJBQVcsQ0FBQyxVQUFVLEVBQUU7UUFDbkMsVUFBVSxFQUFFO1lBQ1YsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxHQUFHLHVCQUFTLENBQUMsSUFBSSxXQUFXO2FBQ3RDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxHQUFHLHVCQUFTLENBQUMsSUFBSSxVQUFVO2FBQ3JDO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxtQkFBbUI7YUFDN0I7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHO1FBQ2pCOzs7O0dBSUQ7S0FDQSxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVqQixNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRW5FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksa0JBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFFLFNBQVM7UUFFaEQsNERBQTREO1FBRTVELDJCQUEyQjtRQUMzQixNQUFNLE1BQU0sR0FBRyxlQUFPLENBQUMsUUFBUSxFQUFFO1lBQy9CLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM1QixXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzVELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDNUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLFdBQVcsQ0FBQztZQUNyQixDQUFDO1NBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRU4sTUFBTSxnQkFBZ0IsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDbEIsQ0FBQztRQUVGLG9DQUFvQztRQUNwQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsS0FBSyxVQUFVO2dCQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUM7RUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHO3VCQUNTLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQzNELE1BQU0sQ0FBQyxJQUNUO01BQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDMUMsTUFBTSxDQUFDLElBQ1Q7c0JBQ2MsZ0JBQWdCOztTQUU3QixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNSLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQztFQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUc7dUJBQ1MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0QsTUFBTSxDQUFDLElBQ1Q7NEJBQ29CLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQ2hFLE1BQU0sQ0FBQyxJQUNUOzt3QkFFZ0IsZ0JBQWdCOzs7V0FHN0IsQ0FBQyxDQUFDO2dCQUNMLE1BQU07U0FDVDtLQUNGO0lBRUQsaUJBQWlCO0lBQ2pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUV6Qyx1QkFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQSxDQUFDIn0=