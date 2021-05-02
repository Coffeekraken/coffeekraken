"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("@coffeekraken/sugar/shared/is/path"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const path_2 = __importDefault(require("path"));
const replacePathTokens_1 = __importDefault(require("@coffeekraken/sugar/node/path/replacePathTokens"));
const resolveGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/resolveGlob"));
const ruleObj = {
    name: 'Path',
    id: 'path',
    settings: {
        mapOnArray: true
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
            cast: (_g = params.cast) !== null && _g !== void 0 ? _g : true
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
        if (params.tokens && node_1.default()) {
            value = replacePathTokens_1.default(value);
        }
        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if (glob_1.default(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
                case 'resolve':
                case 'SFile':
                    if (!node_1.default())
                        return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
                    /* eslint-disable */
                    let files = resolveGlob_1.default(value, {
                        cwd: params.rootDir
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
        if (!path_1.default(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            const __fs = require('fs'); // eslint-disable-line
            if (!__fs.existsSync(value))
                if (params.create) {
                    __fs.mkdirSync(value, { recursive: true });
                }
                else {
                    return new Error(`The passed path "<cyan>${value}</cyan>" does not exists and it should`);
                }
        }
        return value;
    }
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4RUFBMEQ7QUFDMUQsOEVBQTBEO0FBRzFELDhFQUEwRDtBQUUxRCxnREFBMEI7QUFDMUIsd0dBQWtGO0FBQ2xGLDRGQUFzRTtBQXFCdEUsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUU7UUFDUixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztRQUNoQyxPQUFPO1lBQ0wsUUFBUSxRQUFFLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7WUFDbEMsTUFBTSxRQUFFLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsTUFBTSxRQUFFLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsT0FBTyxRQUFFLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3pFLElBQUksUUFBRSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxLQUFLO1lBQzFCLE1BQU0sUUFBRSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzdCLElBQUksUUFBRSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1NBQzFCLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdEU7UUFF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