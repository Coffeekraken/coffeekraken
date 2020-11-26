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
