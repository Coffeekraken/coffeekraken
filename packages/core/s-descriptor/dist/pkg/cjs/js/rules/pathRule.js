"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/shared/is/path");
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
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
                    if ((0, glob_1.default)(value))
                        return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
                    break;
            }
        }
        if (!(0, path_1.__isPath)(value)) {
            return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
        }
        if (params.exists) {
            return new Error(`<red>[SDescriptor.pathRule]</red> Sorry but the "exists" parameter cannot be used in browser context"`);
        }
        return value;
    },
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDZEQUE4RDtBQUM5RCw4RUFBMEQ7QUF3QjFELE1BQU0sT0FBTyxHQUFxQjtJQUM5QixJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFO1FBQ04sVUFBVSxFQUFFLElBQUk7S0FDbkI7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7UUFDOUIsT0FBTztZQUNILFFBQVEsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEtBQUs7WUFDbEMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksS0FBSztZQUM5QixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FBSSxLQUFLO1lBQzlCLE9BQU8sRUFDSCxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUNkLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2xELElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLEtBQUs7WUFDMUIsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksSUFBSTtZQUM3QixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1NBQzVCLENBQUM7SUFDTixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0gsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0YsRUFBRTtRQUM5QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLElBQUksS0FBSyxDQUNaLGtEQUFrRCxDQUNyRCxDQUFDO1NBQ0w7UUFFRCw4QkFBOEI7UUFDOUIsdURBQXVEO1FBQ3ZELHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsdUdBQXVHO1FBQ3ZHLFdBQVc7UUFDWCxrQ0FBa0M7UUFDbEMsTUFBTTtRQUNOLGlCQUFpQjtRQUNqQixJQUFJO1FBRUosSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2IsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNqQixLQUFLLElBQUk7b0JBQ0wsTUFBTTtnQkFDVixLQUFLLEtBQUs7b0JBQ04sSUFBSSxJQUFBLGNBQVEsRUFBQyxLQUFLLENBQUM7d0JBQ2YsT0FBTyxJQUFJLEtBQUssQ0FDWiwwQkFBMEIsS0FBSywrQ0FBK0MsQ0FDakYsQ0FBQztvQkFDTixNQUFNO2FBQ2I7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFBLGVBQVEsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPLElBQUksS0FBSyxDQUNaLDBCQUEwQixLQUFLLDhCQUE4QixDQUNoRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksS0FBSyxDQUNaLHVHQUF1RyxDQUMxRyxDQUFDO1NBQ0w7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9