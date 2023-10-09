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
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        return (0, object_1.__deepMerge)(Object.assign({}, api.this), (_a = (yield (0, load_1.__loadConfigFile)('postcss.config.js'))) !== null && _a !== void 0 ? _a : {}, (_b = (yield (0, load_1.__loadConfigFile)('.postcssrc.json'))) !== null && _b !== void 0 ? _b : {});
    });
}
exports.preprocess = preprocess;
function default_1(api) {
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
            // 'postcss-import',
            // 'postcss-nested',
            // 'postcss-atroot',
            // 'postcss-extend-rule',
            // 'postcss-property-lookup',
            'autoprefixer',
        ],
        pluginsOptions: {},
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE0RDtBQUM1RCx1REFBeUQ7QUFFekQsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxPQUFPLElBQUEsb0JBQVcsRUFDZCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQzNCLE1BQUEsQ0FBQyxNQUFNLElBQUEsdUJBQWdCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLEVBQ25ELE1BQUEsQ0FBQyxNQUFNLElBQUEsdUJBQWdCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQ3BELENBQUM7O0NBQ0w7QUFORCxnQ0FNQztBQUVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTCxzQ0FBc0M7WUFDdEMsb0JBQW9CO1lBQ3BCLG9CQUFvQjtZQUNwQixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLDZCQUE2QjtZQUM3QixjQUFjO1NBQ2pCO1FBQ0QsY0FBYyxFQUFFLEVBQUU7S0FDckIsQ0FBQztBQUNOLENBQUM7QUExQkQsNEJBMEJDIn0=