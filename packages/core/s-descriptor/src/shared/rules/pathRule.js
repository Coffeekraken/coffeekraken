// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/is/path", "@coffeekraken/sugar/shared/is/glob", "@coffeekraken/sugar/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4RUFBMEQ7SUFDMUQsOEVBQTBEO0lBRzFELDhFQUEwRDtJQXFCMUQsTUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxNQUFNO1FBQ1osRUFBRSxFQUFFLE1BQU07UUFDVixRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztZQUNoQyxPQUFPO2dCQUNMLFFBQVEsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7Z0JBQ2xDLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7Z0JBQzlCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7Z0JBQzlCLE9BQU8sRUFBRSxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUN6RSxJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxLQUFLO2dCQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO2dCQUM3QixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO2FBQzFCLENBQUM7UUFDSixDQUFDO1FBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtZQUNoQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxD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