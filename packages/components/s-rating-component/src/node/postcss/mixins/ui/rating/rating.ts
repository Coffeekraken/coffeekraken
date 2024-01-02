import __SInterface from '@coffeekraken/s-interface';

class postcssUiRatingInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiRatingParams {}

export { postcssUiRatingInterface as interface };

/**
 * @name          rating
 * @namespace     ui.rating
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the datetime picker style to any s-rating element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.rating($1);
 *
 * @example     css
 * .s-rating {
 *    @s.ui.rating;
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
    params: Partial<IPostcssUiRatingParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiRatingParams = {
        ...params,
    };

    const vars: string[] = [];

    // bare

    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`

            .s-rating_icons-wrapper {
                font-size: s.scalable(1em);

                i {
                    padding-inline: 5px;
                }
            }

            .s-rating_base {
                color: s.color(main);
            }
            
            .s-rating_rate {
                color: s.color(current);
            }

        `);
    vars.push('}');

    return vars;
}
