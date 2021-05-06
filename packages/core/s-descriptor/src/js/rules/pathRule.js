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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUF3QjFELE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFO1FBQ1IsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7UUFDaEMsT0FBTztZQUNMLFFBQVEsUUFBRSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxLQUFLO1lBQ2xDLE1BQU0sUUFBRSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE1BQU0sUUFBRSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE9BQU8sUUFBRSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN6RSxJQUFJLFFBQUUsTUFBTSxDQUFDLElBQUksbUNBQUksS0FBSztZQUMxQixNQUFNLFFBQUUsTUFBTSxDQUFDLE1BQU0sbUNBQUksSUFBSTtZQUM3QixJQUFJLFFBQUUsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtTQUMxQixDQUFDO0lBQ0osQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7UUFDaEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsOEJBQThCO1FBQzlCLHVEQUF1RDtRQUN2RCx3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHVHQUF1RztRQUN2RyxXQUFXO1FBQ1gsa0NBQWtDO1FBQ2xDLE1BQU07UUFDTixpQkFBaUI7UUFDakIsSUFBSTtRQUVKLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDbkIsS0FBSyxJQUFJO29CQUNQLE1BQU07Z0JBQ1IsS0FBSyxLQUFLO29CQUNSLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQzt3QkFDakIsT0FBTyxJQUFJLEtBQUssQ0FDZCwwQkFBMEIsS0FBSywrQ0FBK0MsQ0FDL0UsQ0FBQztvQkFDSixNQUFNO2FBQ1Q7U0FDRjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxJQUFJLEtBQUssQ0FDZCwwQkFBMEIsS0FBSyw4QkFBOEIsQ0FDOUQsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxLQUFLLENBQ2QsdUdBQXVHLENBQ3hHLENBQUM7U0FDSDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLE9BQU8sQ0FBQyJ9