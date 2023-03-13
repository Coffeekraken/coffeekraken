import __SInterface from '@coffeekraken/s-interface';
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
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // const vars = [
    //     `
    //     body:has(.s-viewport) {
    //         overflow: hidden;
    //     }
    //     .s-viewport {
    //         container-type: inline-size;
    //         container-name: ${
    //             __STheme.get('media.containerName') ?? 'viewport'
    //         };
    //         height: 100vh;
    //         overflow-y: auto;
    //         overflow-x: hidden;
    //     }
    //     body:has(iframe.s-carpenter_editor-iframe) .s-viewport {
    //         @sugar.transition;
    //         position: relative;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         border-left: solid 1px rgba(134, 134, 134, 0.3);
    //         border-right: solid 1px rgba(134, 134, 134, 0.3);
    //         @sugar.scrollbar(accent);
    //     }
    // `,
    // ];
    replaceWith('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLFFBQVE7SUFDUiw4QkFBOEI7SUFDOUIsNEJBQTRCO0lBQzVCLFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsdUNBQXVDO0lBQ3ZDLDZCQUE2QjtJQUM3QixnRUFBZ0U7SUFDaEUsYUFBYTtJQUNiLHlCQUF5QjtJQUN6Qiw0QkFBNEI7SUFDNUIsOEJBQThCO0lBQzlCLFFBQVE7SUFDUiwrREFBK0Q7SUFDL0QsNkJBQTZCO0lBQzdCLDhCQUE4QjtJQUM5QixxQkFBcUI7SUFDckIsdUNBQXVDO0lBQ3ZDLDJEQUEyRDtJQUMzRCw0REFBNEQ7SUFDNUQsb0NBQW9DO0lBQ3BDLFFBQVE7SUFDUixLQUFLO0lBQ0wsS0FBSztJQUVMLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=