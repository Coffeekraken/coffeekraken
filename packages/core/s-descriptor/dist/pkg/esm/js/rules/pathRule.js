// @ts-nocheck
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQXdCMUQsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUU7UUFDTixVQUFVLEVBQUUsSUFBSTtLQUNuQjtJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFOztRQUM5QixPQUFPO1lBQ0gsUUFBUSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksS0FBSztZQUNsQyxNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEtBQUs7WUFDOUIsT0FBTyxFQUNILE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQ2QsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDbEQsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksS0FBSztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxJQUFJO1lBQzdCLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLElBQUk7U0FDNUIsQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDSCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDRixFQUFFO1FBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxLQUFLLENBQ1osa0RBQWtELENBQ3JELENBQUM7U0FDTDtRQUVELDhCQUE4QjtRQUM5Qix1REFBdUQ7UUFDdkQsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQix1R0FBdUc7UUFDdkcsV0FBVztRQUNYLGtDQUFrQztRQUNsQyxNQUFNO1FBQ04saUJBQWlCO1FBQ2pCLElBQUk7UUFFSixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDYixRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEtBQUssSUFBSTtvQkFDTCxNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUM7d0JBQ2YsT0FBTyxJQUFJLEtBQUssQ0FDWiwwQkFBMEIsS0FBSywrQ0FBK0MsQ0FDakYsQ0FBQztvQkFDTixNQUFNO2FBQ2I7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxJQUFJLEtBQUssQ0FDWiwwQkFBMEIsS0FBSyw4QkFBOEIsQ0FDaEUsQ0FBQztTQUNMO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxJQUFJLEtBQUssQ0FDWix1R0FBdUcsQ0FDMUcsQ0FBQztTQUNMO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLE9BQU8sQ0FBQyJ9