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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL21haW4vbm9kZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2Qsa0VBQW1DO0FBQ25DLGdEQUEwQjtBQUMxQixnRkFBMEQ7QUFFMUQsa0VBQXNDO0FBQ3RDLHlFQUFtRDtBQUNuRCxzRUFBZ0Q7QUFDaEQsMEVBQW9EO0FBRXBELGtCQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsR0FBRyx1QkFBUyxDQUFDLElBQUksV0FBVzthQUN0QztZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsR0FBRyx1QkFBUyxDQUFDLElBQUksVUFBVTthQUNyQztZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsbUJBQW1CO2FBQzdCO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRztRQUNqQjs7OztHQUlEO0tBQ0EsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFakIsTUFBTSxLQUFLLEdBQUcsTUFBTSx1QkFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVuRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxD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