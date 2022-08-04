// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __fs from 'fs';
import __path from 'path';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUcxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZUFBZSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBcUJ0RSxNQUFNLE9BQU8sR0FBcUI7SUFDOUIsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRTtRQUNOLFVBQVUsRUFBRSxJQUFJO0tBQ25CO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUU7O1FBQzlCLE9BQU87WUFDSCxRQUFRLEVBQUUsTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxLQUFLO1lBQ2xDLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixPQUFPLEVBQ0gsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FDZCxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNsRCxJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxLQUFLO1lBQzFCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLElBQUk7WUFDN0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtTQUM1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