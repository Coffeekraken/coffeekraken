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
        const css = postcss(postcssPlugins).process(code).css;
        return {
            code: css,
            map: null
        };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1Jpb3Rqc1BsdWdpblBvc3Rjc3NQcmVwcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzUmlvdGpzUGx1Z2luUG9zdGNzc1ByZXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQ0FBZ0MsQ0FDdEQsY0FBcUI7SUFFckIsYUFBYTtJQUNiLG9CQUFvQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxJQUFJO1FBQ25ELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3RELE9BQU87WUFDTCxJQUFJLEVBQUUsR0FBRztZQUNULEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9