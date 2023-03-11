import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginMediaInitMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginMediaInitMixinInterface as interface };
/**
 * @name           init
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin initialize the media environment that make use of container queries instead of
 * traditional media queries. For that we need to add the "container" property onto the ".s-viewport"
 * element that contains the whole website as well as on the body to make sure it works everywere.
 *
 * @snippet         @sugar.media.init
 *
 * @example        css
 * \@sugar.media.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `
        body:has(.s-viewport) {
            overflow: hidden;
        }
        .s-viewport {
            container-type: inline-size;
            container-name: ${(_a = __STheme.get('media.containerName')) !== null && _a !== void 0 ? _a : 'viewport'};
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        body:has(iframe.s-carpenter_editor-iframe) .s-viewport {
            @sugar.transition;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            border-left: solid 1px rgba(134, 134, 134, 0.3);
            border-right: solid 1px rgba(134, 134, 134, 0.3);
            @sugar.scrollbar(accent);
        }
    `,
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDs7SUFDRyxNQUFNLFdBQVcscUJBQ1YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHO1FBQ1Q7Ozs7Ozs4QkFPUSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsbUNBQUksVUFDM0M7Ozs7Ozs7Ozs7Ozs7O0tBY1A7S0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==