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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const s_vite_postcss_plugin_1 = __importDefault(require("@coffeekraken/s-vite-postcss-plugin"));
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
        vite: {
            /**
             * @name          logLevel
             * @namespace     config.mitosis.vite
             * @type          String
             * @default      error
             *
             * Specify the log level
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            logLevel: 'error',
            get plugins() {
                return [(0, s_vite_postcss_plugin_1.default)()];
            },
            server: {
                /**
                 * @name            port
                 * @namespace       config.mitosis.vite.server
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
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdHQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsdURBQXlEO0FBRXpELFNBQXNCLFVBQVUsQ0FBQyxHQUFHOzs7UUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sSUFBQSx1QkFBZ0IsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNuRSxPQUFPLElBQUEsb0JBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQUhELGdDQUdDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxPQUFPO1lBRWpCLElBQUksT0FBTztnQkFDUCxPQUFPLENBQUMsSUFBQSwrQkFBb0IsR0FBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFFVixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFO3dCQUNILE1BQU0sRUFBRSx1QkFBdUI7d0JBQy9CLFlBQVksRUFBRSxJQUFJO3FCQUNyQjtvQkFDRCxxQkFBcUIsRUFBRTt3QkFDbkIsTUFBTSxFQUFFLHVCQUF1Qjt3QkFDL0IsWUFBWSxFQUFFLElBQUk7cUJBQ3JCO29CQUNELHVCQUF1QixFQUFFO3dCQUNyQixNQUFNLEVBQUUsdUJBQXVCO3dCQUMvQixZQUFZLEVBQUUsSUFBSTtxQkFDckI7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFwREQsNEJBb0RDIn0=