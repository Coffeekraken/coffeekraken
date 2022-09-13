"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("@coffeekraken/sugar/glob");
const is_1 = require("@coffeekraken/sugar/is");
const string_1 = require("@coffeekraken/sugar/string");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
                path = path_1.default.resolve(params.rootDir, path);
            }
            return path;
        }
        // tokens
        if (params.tokens && (0, is_1.__isNode)()) {
            value = (0, string_1.__replaceTokens)(value);
        }
        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if ((0, is_1.__isGlob)(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
                case 'resolve':
                case 'SFile':
                    if (!(0, is_1.__isNode)())
                        return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
                    /* eslint-disable */
                    let files = (0, glob_1.__resolveGlob)(value, {
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
        if (!(0, is_1.__isPath)(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG1EQUF5RDtBQUN6RCwrQ0FBc0U7QUFDdEUsdURBQTZEO0FBQzdELDRDQUFzQjtBQUN0QixnREFBMEI7QUF1QjFCLE1BQU0sT0FBTyxHQUFxQjtJQUM5QixJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFO1FBQ04sVUFBVSxFQUFFLElBQUk7S0FDbkI7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7UUFDOUIsT0FBTztZQUNILFFBQVEsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7WUFDbEMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE9BQU8sRUFDSCxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUNkLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2xELElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEtBQUs7WUFDMUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksSUFBSTtZQUM3QixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1NBQzVCLENBQUM7SUFDTixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0gsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0YsRUFBRTtRQUM5QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLElBQUksS0FBSyxDQUNaLGtEQUFrRCxD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