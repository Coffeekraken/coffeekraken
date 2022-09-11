"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("@coffeekraken/sugar/shared/is/path"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/node/token/replaceTokens"));
const glob_2 = require("@coffeekraken/sugar/glob");
const ruleObj = {
    name: 'Path',
    id: 'path',
    settings: {
        mapOnArray: true,
    },
    processParams: (params) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            absolute: (_a = params.absolute) !== null && _a !== void 0 ? _a : false,
            exists: (_b = params.exists) !== null && _b !== void 0 ? _b : false,
            create: (_c = params.create) !== null && _c !== void 0 ? _c : false,
            rootDir: (_d = params.rootDir) !== null && _d !== void 0 ? _d : (process && process.cwd ? process.cwd() : '/'),
            glob: (_e = params.glob) !== null && _e !== void 0 ? _e : false,
            tokens: (_f = params.tokens) !== null && _f !== void 0 ? _f : true,
            cast: (_g = params.cast) !== null && _g !== void 0 ? _g : true,
        };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (typeof value !== 'string') {
            return new Error('The path value must be a <yellow>String</yellow>');
        }
        function toAbsolute(path) {
            if (params.absolute && path.slice(0, 1) !== '/') {
                if (!params.cast)
                    return new Error(`The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`);
                path = path_2.default.resolve(params.rootDir, path);
            }
            return path;
        }
        // tokens
        if (params.tokens && (0, node_1.default)()) {
            value = (0, replaceTokens_1.default)(value);
        }
        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if ((0, glob_1.default)(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
                case 'resolve':
                case 'SFile':
                    if (!(0, node_1.default)())
                        return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
                    /* eslint-disable */
                    let files = (0, glob_2.__resolveGlob)(value, {
                        cwd: params.rootDir,
                    });
                    files = files.map((file) => {
                        if (params.glob === 'SFile')
                            return file;
                        if (params.absolute)
                            return toAbsolute(file.path);
                        return file.path;
                    });
                    /* eslint-enable */
                    return files;
                    break;
            }
        }
        if (!(0, path_1.default)(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            if (!fs_1.default.existsSync(value))
                if (params.create) {
                    fs_1.default.mkdirSync(value, { recursive: true });
                }
                else {
                    return new Error(`The passed path "<cyan>${value}</cyan>" does not exists and it should`);
                }
        }
        return value;
    },
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhFQUEwRDtBQUMxRCw4RUFBMEQ7QUFHMUQsOEVBQTBEO0FBQzFELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsaUdBQTJFO0FBQzNFLG1EQUF5RDtBQXFCekQsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUU7UUFDTixVQUFVLEVBQUUsSUFBSTtLQUNuQjtJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztRQUM5QixPQUFPO1lBQ0gsUUFBUSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksS0FBSztZQUNsQyxNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsT0FBTyxFQUNILE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQ2QsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbEQsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksS0FBSztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzdCLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLElBQUk7U0FDNUIsQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDSCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDRixFQUFFO1FBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9B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