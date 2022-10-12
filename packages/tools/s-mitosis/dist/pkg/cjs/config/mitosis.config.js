"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const load_1 = require("@coffeekraken/sugar/load");
const object_1 = require("@coffeekraken/sugar/object");
function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield (0, load_1.__loadConfigFile)('mitosis.config.js'))) !== null && _a !== void 0 ? _a : {};
        return (0, object_1.__deepMerge)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        server: {
            /**
             * @name            port
             * @namespace       config.mitosis.server
             * @type            Number
             * @default         3001
             *
             * Specify the mitosis server port
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 3001,
            proxy: {
                '^/$': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
                '/dist/css/index.css': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
                '/dist/js/index.esm.js': {
                    target: 'http://127.0.0.1:8082',
                    changeOrigin: true,
                },
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE0RDtBQUM1RCx1REFBeUQ7QUFFekQsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxJQUFBLHVCQUFnQixFQUFDLG1CQUFtQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ25FLE9BQU8sSUFBQSxvQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBSEQsZ0NBR0M7QUFFRCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSx1QkFBdUI7b0JBQy9CLFlBQVksRUFBRSxJQUFJO2lCQUNyQjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDbkIsTUFBTSxFQUFFLHVCQUF1QjtvQkFDL0IsWUFBWSxFQUFFLElBQUk7aUJBQ3JCO2dCQUNELHVCQUF1QixFQUFFO29CQUNyQixNQUFNLEVBQUUsdUJBQXVCO29CQUMvQixZQUFZLEVBQUUsSUFBSTtpQkFDckI7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFoQ0QsNEJBZ0NDIn0=