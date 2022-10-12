var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';
export function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('mitosis.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(api.this, config);
    });
}
export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxNQUFNLFVBQWdCLFVBQVUsQ0FBQyxHQUFHOzs7UUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDbkUsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDeEM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUUsdUJBQXVCO29CQUMvQixZQUFZLEVBQUUsSUFBSTtpQkFDckI7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ25CLE1BQU0sRUFBRSx1QkFBdUI7b0JBQy9CLFlBQVksRUFBRSxJQUFJO2lCQUNyQjtnQkFDRCx1QkFBdUIsRUFBRTtvQkFDckIsTUFBTSxFQUFFLHVCQUF1QjtvQkFDL0IsWUFBWSxFQUFFLElBQUk7aUJBQ3JCO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=