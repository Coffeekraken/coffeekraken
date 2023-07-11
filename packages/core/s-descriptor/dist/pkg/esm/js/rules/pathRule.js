// @ts-nocheck
import { __isGlob, __isPath } from '@coffeekraken/sugar/is';
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
    },
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBMEI1RCxNQUFNLE9BQU8sR0FBcUI7SUFDOUIsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRTtRQUNOLFVBQVUsRUFBRSxJQUFJO0tBQ25CO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUU7O1FBQzlCLE9BQU87WUFDSCxRQUFRLEVBQUUsTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxLQUFLO1lBQ2xDLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixPQUFPLEVBQ0gsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FDZCxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNsRCxJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxLQUFLO1lBQzFCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLElBQUk7WUFDN0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtTQUM1QixDQUFDO0lBQ04sQ0FBQztJQUNELEtBQUssRUFBRSxDQUNILEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNGLEVBQUU7UUFDOUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxJQUFJLEtBQUssQ0FDWixrREFBa0QsQ0FDckQsQ0FBQztTQUNMO1FBRUQsOEJBQThCO1FBQzlCLHVEQUF1RDtRQUN2RCx3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHVHQUF1RztRQUN2RyxXQUFXO1FBQ1gsa0NBQWtDO1FBQ2xDLE1BQU07UUFDTixpQkFBaUI7UUFDakIsSUFBSTtRQUVKLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNiLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxJQUFJO29CQUNMLE1BQU07Z0JBQ1YsS0FBSyxLQUFLO29CQUNOLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQzt3QkFDZixPQUFPLElBQUksS0FBSyxDQUNaLDBCQUEwQixLQUFLLCtDQUErQyxDQUNqRixDQUFDO29CQUNOLE1BQU07YUFDYjtTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPLElBQUksS0FBSyxDQUNaLDBCQUEwQixLQUFLLDhCQUE4QixDQUNoRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksS0FBSyxDQUNaLHVHQUF1RyxDQUMxRyxDQUFDO1NBQ0w7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQztBQUVGLGVBQWUsT0FBTyxDQUFDIn0=