// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __isNode from '@coffeekraken/sugar/shared/is/node';
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
                if (__isNode()) {
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
        if (params.tokens && __isNode()) {
            const __replacePathTokens = require('@coffeekraken/sugar/node/path/replacePathTokens') // eslint-disable-line
                .default;
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
        if (!__isPath(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            if (!__isNode())
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
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZGVzY3JpcHRvci9zcmMvc2hhcmVkL3J1bGVzL3BhdGhSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUcxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQXFCMUQsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUU7UUFDUixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksS0FBSztZQUNsQyxNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsT0FBTyxFQUFFLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDekUsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksS0FBSztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzdCLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLElBQUk7U0FDMUIsQ0FBQztJQUNKLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFB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