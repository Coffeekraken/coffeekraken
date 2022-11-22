import __SInterface from '@coffeekraken/s-interface';

class postcssUiCardClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}

export interface IPostcssUiCardClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiCardClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiCardClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiCardClassesParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    function cardTpl(params) {
        return `*   <div class="${params.class}">
                *     <div class="s-card__media">
                *         <img class="s-card__img" src="https://picsum.photos/1600/900" title="..." alt="..." />
                *     </div>
                *     <div class="s-card__content s-spacing:30">
                *         <h1 class="s-card__title s-typo:h3">
                *             Hello world
                *         </h1>
                *         <p class="s-card__lead s-typo:lead s-tc:accent">
                *             Lorem ipsum dolor sit amet
                *         </p>
                *         <p class="s-card__text s-typo:p">
                *             Ullamco aute ex mollit enim eu exercitation excepteur consequat laborum. Incididunt eiusmod commodo officia minim consequat enim occaecat est elit cillum. Incididunt pariatur duis ex sint. Qui aliqua pariatur cupidatat exercitation quis ea eu officia. Deserunt esse magna occaecat consectetur. Irure qui velit dolor ipsum qui cillum adipisicing reprehenderit.
                *         </p>
                *         <div class="s-card__cta">
                *            <a class="s-btn s-color:accent">Click me!</a> 
                *         </div>
                *     </div>
                * </div>`;
    }

    vars.comment(
        () => `
      /**
        * @name          Card
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/card
        * @platform       css
        * @status       beta
        * 
        * These classes allows to display nice card with options like direction, spacing, etc...
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * \\@sugar.ui.card.classes;
        * 
        * .my-card {
        *   \@sugar.ui.card;
        * }
        * 
        * @cssClass             s-card                       Specify that the card has to be displayed verticaly
        * @cssClass             s-card:vertical            Specify that the card has to be displayed verticaly
        * @cssClass             s-card:horizontal            Specify that the card has to be displayed horizontaly
        * @cssClass             s-card:vertical-reverse            Specify that the card has to be displayed verticaly reversed
        * @cssClass             s-card:horizontal-reverse            Specify that the card has to be displayed horizontaly reverses
        * 
        * @example          html            Default vertical
        ${cardTpl({
            class: 's-card',
        })}
        * 
        * @example          html            Horizontal
        ${cardTpl({
            class: 's-card:horizontal',
        })}
        *
        * @example          html            Vertical reverse
        ${cardTpl({
            class: 's-card:vertical-reverse',
        })}
        *
        * @example          html            Horizontal reverse
        ${cardTpl({
            class: 's-card:horizontal-reverse',
        })}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.code(
            `
                .s-card {
                    @sugar.ui.card($scope: bare);
                }
            `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            `/**
            * @name           .s-card:not(.s-bare)
            * @namespace          sugar.ui.card
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> card
            * 
            * @example        html
            ${cardTpl({
                class: 's-card',
            })}
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-card:not(.s-bare) {
                @sugar.ui.card($scope: lnf);
            }`,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
