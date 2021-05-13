// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
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
        // function toAbsolute(path) {
        //   if (params.absolute && path.slice(0, 1) !== '/') {
        //     if (!params.cast)
        //       return new Error(
        //         `The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`
        //       );
        //     path = `${rootDir}${path}`;
        //   }
        //   return path;
        // }
        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if (__isGlob(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
            }
        }
        if (!__isPath(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            return new Error(`<red>[SDescriptor.pathRule]</red> Sorry but the "exists" parameter cannot be used in browser context"`);
        }
        return value;
    }
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUF3QjFELE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFO1FBQ1IsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7WUFDbEMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE9BQU8sRUFBRSxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3pFLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEtBQUs7WUFDMUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksSUFBSTtZQUM3QixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1NBQzFCLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdEU7UUFFRCw4QkFBOEI7UUFDOUIsdURBQXVEO1FBQ3ZELHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsdUdBQXVHO1FBQ3ZHLFdBQVc7UUFDWCxrQ0FBa0M7UUFDbEMsTUFBTTtRQUNOLGlCQUFpQjtRQUNqQixJQUFJO1FBRUosSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNuQixLQUFLLElBQUk7b0JBQ1AsTUFBTTtnQkFDUixLQUFLLEtBQUs7b0JBQ1IsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO3dCQUNqQixPQUFPLElBQUksS0FBSyxDQUNkLDBCQUEwQixLQUFLLCtDQUErQyxDQUMvRSxDQUFDO29CQUNKLE1BQU07YUFDVDtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksS0FBSyxDQUNkLDBCQUEwQixLQUFLLDhCQUE4QixDQUM5RCxDQUFDO1NBQ0g7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLEtBQUssQ0FDZCx1R0FBdUcsQ0FDeEcsQ0FBQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsT0FBTyxDQUFDIn0=