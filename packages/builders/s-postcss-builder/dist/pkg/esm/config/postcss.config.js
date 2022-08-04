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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRzs7O1FBQ2hDLE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDM0IsTUFBQSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLEVBQ25ELE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUNwRCxDQUFDOztDQUNMO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTCxzQ0FBc0M7WUFDdEMsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIscUJBQXFCO1lBQ3JCLHlCQUF5QjtZQUN6QixjQUFjO1NBQ2pCO1FBQ0QsY0FBYyxFQUFFLEVBQUU7S0FDckIsQ0FBQztBQUNOLENBQUMifQ==