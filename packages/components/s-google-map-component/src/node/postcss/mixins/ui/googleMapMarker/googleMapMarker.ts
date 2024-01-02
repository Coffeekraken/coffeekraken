import __SInterface from '@coffeekraken/s-interface';

class postcssUiGoogleMapMarkerInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiGoogleMapMarkerParams {}

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

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiGoogleMapMarkerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiGoogleMapMarkerParams = {
        ...params,
    };

    const vars: string[] = [];

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
