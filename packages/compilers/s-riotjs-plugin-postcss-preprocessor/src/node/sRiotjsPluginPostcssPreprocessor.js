var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerPreprocessor } from '@riotjs/compiler';
import postcss from 'postcss';
/**
 * @name            sRiotjsPluginPostcssPreprocessor
 * @namespace       node
 * @type            Function
 *
 * This riot preprocessor allows you to use postcss inside your component
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sRiotjsPluginPostcssPreprocessor(postcssPlugins) {
    // @ts-ignore
    registerPreprocessor('css', 'postcss', function (code) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // resolve plugins paths
            const plugins = [];
            for (let i = 0; i < postcssPlugins.length; i++) {
                const p = postcssPlugins[i];
                if (typeof p === 'string') {
                    const { default: plug } = yield import(p);
                    plugins.push((_a = plug.default) !== null && _a !== void 0 ? _a : plug);
                }
                else {
                    plugins.push(p);
                }
            }
            const result = yield postcss(plugins).process(code);
            console.log(result);
            return {
                code: result.css,
                map: null
            };
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1Jpb3Rqc1BsdWdpblBvc3Rjc3NQcmVwcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzUmlvdGpzUGx1Z2luUG9zdGNzc1ByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQ0FBZ0MsQ0FDdEQsY0FBcUI7SUFFckIsYUFBYTtJQUNiLG9CQUFvQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBZ0IsSUFBSTs7O1lBRXpELHdCQUF3QjtZQUN4QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7WUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3pCLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsT0FBTyxtQ0FBSSxJQUFJLENBQUMsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakI7YUFDRjtZQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBCLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUNoQixHQUFHLEVBQUUsSUFBSTthQUNWLENBQUM7O0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9