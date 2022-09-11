// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __fs from 'fs';
import __path from 'path';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import { __resolveGlob } from '@coffeekraken/sugar/glob';
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
                path = __path.resolve(params.rootDir, path);
            }
            return path;
        }
        // tokens
        if (params.tokens && __isNode()) {
            value = __replaceTokens(value);
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
        if (!__isPath(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            if (!__fs.existsSync(value))
                if (params.create) {
                    __fs.mkdirSync(value, { recursive: true });
                }
                else {
                    return new Error(`The passed path "<cyan>${value}</cyan>" does not exists and it should`);
                }
        }
        return value;
    },
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUcxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZUFBZSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXFCekQsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUU7UUFDTixVQUFVLEVBQUUsSUFBSTtLQUNuQjtJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztRQUM5QixPQUFPO1lBQ0gsUUFBUSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksS0FBSztZQUNsQyxNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsT0FBTyxFQUNILE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQ2QsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbEQsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksS0FBSztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzdCLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJ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