"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
if (global && !global.document)
    global.document = {};
exports.default = (api) => {
    var _a, _b, _c, _d;
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            env
         * @type            String
         * @namespace       config.env
         * @default         process.env.NODE_ENV ?? document.env.ENV ?? 'dev`
         *
         * Specify the environment env. This is usually "production" or "dev" as value.
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        // @ts-ignore
        env: (_d = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : (_c = document === null || document === void 0 ? void 0 : document.env) === null || _c === void 0 ? void 0 : _c.ENV) !== null && _d !== void 0 ? _d : 'development',
        git: {
            template: {
                name: 'Template',
                commit: {
                    id: undefined,
                    time: undefined,
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsYUFBYTtBQUNiLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7SUFBRSxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVyRCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFOztJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYTtRQUNiLEdBQUcsRUFBRSxNQUFBLE1BQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRywwQ0FBRSxRQUFRLG1DQUFJLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsMENBQUUsR0FBRyxtQ0FBSSxhQUFhO1FBRWxFLEdBQUcsRUFBRTtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFO29CQUNKLEVBQUUsRUFBRSxTQUFTO29CQUNiLElBQUksRUFBRSxTQUFTO2lCQUNsQjthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=