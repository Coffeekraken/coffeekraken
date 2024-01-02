import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiRatingClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiRatingClassesParams {}

export { postcssUiRatingClassesInterface as interface };

/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.rating
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent rating
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.rating.classes($1);
 *
 * @example        css
 * \@s.ui.rating.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiRatingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiRatingClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
        .s-rating {
            @s.scope.only 'bare' {
                @s.ui.rating;
            }
        }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
    vars.comment(
        `/**
            * @name          .s-rating[lnf="default"]
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> rating
            * 
            * @example        html
            * <s-rating></s-rating>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `
            .s-rating[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.rating;
                }
            }`,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    vars.code(`@s.scope 'vr' {`);
    vars.comment(
        `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-rating></s-rating>
            *   <br />
            *   <s-rating></s-rating>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    ).code(
        `@s.rhythm.vertical {
                .s-rating {
                    ${__STheme.current.jsObjectToCssProperties(
                        __STheme.current.get('ui.rating.rhythmVertical'),
                    )}
                } 
            }
        `,
        {
            type: 'CssClass',
        },
    );
    vars.code('}');

    return vars;
}
