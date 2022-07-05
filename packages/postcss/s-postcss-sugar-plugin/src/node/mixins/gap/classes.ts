import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';

/**
 * @name           classes
 * @namespace      node.mixin.gap
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the gap helper classes like s-gap, s-gap:row, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.gap.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginGapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginGapClassesParams {}

export { postcssSugarPluginGapClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGapClassesParams = {
        ...params,
    };
    const spacesKeys = __keysFirst(Object.keys(__STheme.get('space')), [
        'default',
    ]);

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Gap
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gap
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some gap attributes on any HTMLElement and with
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-gap              Apply the default gap to any HTMLElement
        * @cssClass                s-gap:row          Apply the default row gap to any HTMLElement
        * @cssClass                s-gap:column          Apply the default column gap to any HTMLElement
        ${spacesKeys.map(
            (space) => `
            * @cssClass                s-gap:${space}          Apply the ${space} gap to any HTMLElement
            * @cssClass                s-gap:row:${space}          Apply the ${space} row gap to any HTMLElement
            * @cssClass                s-gap:column:${space}          Apply the ${space} column gap to any HTMLElement
        `,
        )}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex s-gap:40">
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">1</div>
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">2</div>
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">3</div>
        * </div>
        * 
        * @example        html          Simple grid
        * <div class="s-grid:3 s-gap:40">
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">1</div>
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">2</div>
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    spacesKeys.forEach((space) => {
        vars.comment(
            () => `/**
                * @name          s-gap${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap${
                    space === 'default' ? '' : `:${space}`
                }">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-gap${
                    space === 'default' ? '' : `--${space}`
                }:not(.s-gap--column):not(.s-gap--row) {
                    gap: sugar.margin(${space});
                }`,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `/**
                * @name          s-gap:row${
                    space === 'default' ? '' : `:${space}`
                }
                * @namespace          sugar.style.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the row gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:row${
                    space === 'default' ? '' : `:${space}`
                }">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-gap--row.s-gap${space === 'default' ? '' : `--${space}`} {
                    row-gap: sugar.margin(${space});
                }`,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `/**
                * @name          s-gap:column${
                    space === 'default' ? '' : `:${space}`
                }
                * @namespace          sugar.style.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the column gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:column${
                    space === 'default' ? '' : `:${space}`
                }">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-gap--column.s-gap${space === 'default' ? '' : `--${space}`} {
                    column-gap: sugar.margin(${space});
                }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
