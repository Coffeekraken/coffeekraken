import __SInterface from '@coffeekraken/s-interface';
class postcssUiGoogleMapMarkerInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiGoogleMapMarkerInterface as interface };
/**
 * @name          googleMap
 * @namespace     ui.googleMap
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the google map style to any s-google-map element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.googleMapMarker($1);
 *
 * @example     css
 * .s-google-map-marker {
 *    @s.ui.googleMapMarker;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
            position: relative;

            .s-google-map-marker_icon {
                font-size: 50px;
                transform-origin: 50% 100%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            &:hover .s-google-map-marker_icon:has(+ .s-google-map-marker_content),
            &:hover .s-google-map-marker_content + .s-google-map-marker_icon {
                font-size: 20px;
            }

            .s-google-map-marker_content {
                position: absolute;
                bottom: 30px;
                left: 50%;
                opacity: 0;
                pointer-events: none;
                transform: translateX(-50%) translateY(-20px);
            }

            &:hover .s-google-map-marker_content {
                opacity: 1;
                pointer-events: all;
                transform: translateX(-50%) translateY(0);
            }
    `);
    vars.push('}');
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            .s-google-map-marker_content {
                @s.transition (ui.googleMapMarker.transition);
            }
            .s-google-map-marker_icon {
                color: s.color(current);
                @s.transition (ui.googleMapMarker.transition);
            }
        `);
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBK0JULENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==