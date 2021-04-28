"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("@coffeekraken/sugar/shared/is/path"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
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
                if (node_1.default()) {
                    const __path = require('path'); // eslint-disable-line
                    path = __path.resolve(params.rootDir, path);
                }
                else {
                    path = `${rootDir}${path}`;
                }
            }
            return path;
        }
        // tokens
        if (params.tokens && node_1.default()) {
            const __replacePathTokens = require('@coffeekraken/sugar/node/path/replacePathTokens') // eslint-disable-line
                .default;
            value = __replacePathTokens(value);
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
                    const __resolveGlob = require('@coffeekraken/sugar/node/glob/resolveGlob') // eslint-disable-line
                        .default;
                    /* eslint-disable */
                    let files = __resolveGlob(value, {
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
            if (!node_1.default())
                return new Error(`Sorry but the "<yellow>exists</yellow>" parameter can be used only in a node context`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZGVzY3JpcHRvci9zcmMvc2hhcmVkL3J1bGVzL3BhdGhSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhFQUEwRDtBQUMxRCw4RUFBMEQ7QUFHMUQsOEVBQTBEO0FBcUIxRCxNQUFNLE9BQU8sR0FBcUI7SUFDaEMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRTtRQUNSLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUU7O1FBQ2hDLE9BQU87WUFDTCxRQUFRLEVBQUUsTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxLQUFLO1lBQ2xDLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixPQUFPLEVBQUUsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN6RSxJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxLQUFLO1lBQzFCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLElBQUk7WUFDN0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtTQUMxQixDQUFDO0lBQ0osQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7UUFDaEMsSUFBSSxPQUFPLEtB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