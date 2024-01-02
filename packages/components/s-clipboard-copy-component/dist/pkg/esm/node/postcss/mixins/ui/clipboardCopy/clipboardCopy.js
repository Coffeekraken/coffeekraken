import __SInterface from '@coffeekraken/s-interface';
class postcssUiClipboardCopyInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiClipboardCopyInterface as interface };
/**
 * @name          clipbordCopy
 * @namespace     ui.clipboardCopy
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the clipbord copy style to any s-clipboard-copy element
 *
 * @snippet         @s.ui.clipboardCopy($1);
 *
 * @example     css
 * .s-clipboard-copy {
 *    @s.ui.clipboardCopy;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            .s-clipboard-copy_root[state='success'] {
                color: s.color(success);
            }
            .s-clipboard-copy_root[state='error'] {
                color: s.color(error);
            }
        `);
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sK0JBQWdDLFNBQVEsWUFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUVQLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztTQU9MLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=