import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
}
postcssSugarPluginUiLoaderClassesClassesInterface.definition = {};
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/spinner.js`],
    };
}
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
        * @name           s-loader:spinner
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">spinner</s-color>" loader
        * 
        * @example        html
        * <div class="s-loader\:spinner"></div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-loader--spinner {
            @sugar.ui.loader.spinner();
        }
        `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpREFBa0QsU0FBUSxZQUFZOztBQUNqRSw0REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsaURBQWlELElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsTUFBTSxVQUFVLFlBQVk7SUFDeEIsT0FBTztRQUNILEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLGFBQWEsQ0FBQztLQUN2QyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztTQWdCTCxDQUFDLENBQUM7SUFFUCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=