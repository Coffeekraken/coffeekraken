"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
if (global && !global.window)
    global.window = {};
exports.default = {
    /**
     * @name            env
     * @type            String
     * @namespace       config.env
     * @default         process.env.NODE_ENV ?? window.env.ENV ?? 'development`
     *
     * Specify the environment env. This is usually "production" or "development" as value.
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // @ts-ignore
    env: (_d = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : (_c = window === null || window === void 0 ? void 0 : window.env) === null || _c === void 0 ? void 0 : _c.ENV) !== null && _d !== void 0 ? _d : 'development'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVudi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtJQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBRWpELGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILGFBQWE7SUFDYixHQUFHLG9CQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLDBDQUFFLFFBQVEseUNBQUksTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsMENBQUUsR0FBRyxtQ0FBSSxhQUFhO0NBQ2pFLENBQUMifQ==