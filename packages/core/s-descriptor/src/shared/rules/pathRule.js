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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4RUFBMEQ7SUFDMUQsOEVBQTBEO0lBRzFELDhFQUEwRDtJQXFCMUQsTUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxNQUFNO1FBQ1osRUFBRSxFQUFFLE1BQU07UUFDVixRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztZQUNoQyxPQUFPO2dCQUNMLFFBQVEsUUFBRSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxLQUFLO2dCQUNsQyxNQUFNLFFBQUUsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztnQkFDOUIsTUFBTSxRQUFFLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7Z0JBQzlCLE9BQU8sUUFBRSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDekUsSUFBSSxRQUFFLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEtBQUs7Z0JBQzFCLE1BQU0sUUFBRSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO2dCQUM3QixJQUFJLFFBQUUsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTthQUMxQixDQUFDO1FBQ0osQ0FBQztRQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7WUFDaEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQzthQUN0RTtZQUVELFNBQVMsVUFBVSxDQUFDLElBQUk7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