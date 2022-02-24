var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function preprocess(env, rawPostcssConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('postcss.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(rawPostcssConfig, config);
    });
}
export default function (env, config) {
    if (env.platform !== 'node')
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
            // 'postcss-easy-import',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE1BQU0sVUFBZ0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTOzs7UUFDN0QsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDbkUsT0FBTyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ2hEO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTCxzQ0FBc0M7WUFDdEMseUJBQXlCO1lBQ3pCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLHFCQUFxQjtZQUNyQix5QkFBeUI7WUFDekIsY0FBYztTQUNqQjtRQUNELGNBQWMsRUFBRSxFQUFFO0tBQ3JCLENBQUM7QUFDTixDQUFDIn0=