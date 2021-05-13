// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __path from 'path';
import __replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
import __resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
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
                path = __path.resolve(params.rootDir, path);
            }
            return path;
        }
        // tokens
        if (params.tokens && __isNode()) {
            value = __replacePathTokens(value);
        }
        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if (__isGlob(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
                case 'resolve':
                case 'SFile':
                    if (!__isNode())
                        return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
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
        if (!__isPath(value)) {
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
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFHMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sbUJBQW1CLE1BQU0saURBQWlELENBQUM7QUFDbEYsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFxQnRFLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFO1FBQ1IsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7WUFDbEMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE9BQU8sRUFBRSxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3pFLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEtBQUs7WUFDMUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksSUFBSTtZQUM3QixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1NBQzFCLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FB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