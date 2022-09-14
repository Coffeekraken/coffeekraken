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
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        return __deepMerge(Object.assign({}, api.this), (_a = (yield __loadConfigFile('postcss.config.js'))) !== null && _a !== void 0 ? _a : {}, (_b = (yield __loadConfigFile('.postcssrc.json'))) !== null && _b !== void 0 ? _b : {});
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            plugins
         * @namespace       config.postcss
         * @type            String
         * @default         ['@coffeekraken/s-postcss-sugar-plugin','postcss-nested','postcss-atroot','postcss-extend-rule','postcss-property-lookup','autoprefixer']
         *
         * Specify the plugins to use with the postcss process
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        plugins: [
            '@coffeekraken/s-postcss-sugar-plugin',
            'postcss-import',
            'postcss-nested',
            'postcss-atroot',
            'postcss-extend-rule',
            'postcss-property-lookup',
            'autoprefixer',
        ],
        pluginsOptions: {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxNQUFNLFVBQWdCLFVBQVUsQ0FBQyxHQUFHOzs7UUFDaEMsT0FBTyxXQUFXLENBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUMzQixNQUFBLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsRUFDbkQsTUFBQSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQ3BELENBQUM7O0NBQ0w7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNMLHNDQUFzQztZQUN0QyxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixxQkFBcUI7WUFDckIseUJBQXlCO1lBQ3pCLGNBQWM7U0FDakI7UUFDRCxjQUFjLEVBQUUsRUFBRTtLQUNyQixDQUFDO0FBQ04sQ0FBQyJ9