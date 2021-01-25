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
const find_in_files_1 = __importDefault(require("find-in-files"));
const path_1 = __importDefault(require("path"));
const writeFileSync_1 = __importDefault(require("../../node/fs/writeFileSync"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const parse_1 = __importDefault(require("../../node/docblock/parse"));
const includes_1 = __importDefault(require("../../node/string/includes"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub2RlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUdkLGtFQUFtQztBQUNuQyxnREFBMEI7QUFDMUIsZ0ZBQTBEO0FBRTFELGtFQUFzQztBQUN0Qyx5RUFBbUQ7QUFDbkQsc0VBQWdEO0FBQ2hELDBFQUFvRDtBQUVwRCxpQkFBUyxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLFVBQVUsRUFBRTtRQUNuQyxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEdBQUcsdUJBQVMsQ0FBQyxJQUFJLFdBQVc7YUFDdEM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEdBQUcsdUJBQVMsQ0FBQyxJQUFJLFVBQVU7YUFDckM7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLG1CQUFtQjthQUM3QjtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUc7UUFDakI7Ozs7R0FJRDtLQUNBLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFbkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFD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