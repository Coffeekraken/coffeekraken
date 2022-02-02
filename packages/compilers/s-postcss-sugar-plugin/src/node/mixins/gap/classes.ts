import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';

/**
 * @name           classes
 * @namespace      node.mixins.gap
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the gap helper classes like s-gap, s-gap:row, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.gap.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    const spacesKeys = __keysFirst(Object.keys(__STheme.config('space')), ['default']);

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Gap
        * @namespace          sugar.css.helpers
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
        ${spacesKeys.map(space => `
            * @cssClass                s-gap:${space}          Apply the ${space} gap to any HTMLElement
            * @cssClass                s-gap:row:${space}          Apply the ${space} row gap to any HTMLElement
            * @cssClass                s-gap:column:${space}          Apply the ${space} column gap to any HTMLElement
        `)}
        * 
        * @example        html          Simple grid
        * <div class="s-flex s-gap:40">
        *   <div class="s-badge s-color:accent">Hello</div>
        *   <div class="s-badge s-color:accent">Worl</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    spacesKeys.forEach(space => {

        vars.comment(
            () => `/**
                * @name          s-gap${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
            `,
        ).code(`
                .s-gap${space === 'default' ? '' : `--${space}`}:not(.s-gap--column):not(.s-gap--row) {
                    gap: sugar.space(${space});
                }`);

        vars.comment(
            () => `/**
                * @name          s-gap:row${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the row gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:row${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
            `,
        ).code(`
                .s-gap--row.s-gap${space === 'default' ? '' : `--${space}`} {
                    row-gap: sugar.space(${space});
                }`);

        vars.comment(
            () => `/**
                * @name          s-gap:column${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the column gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:column${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
            `,
        ).code(`
                .s-gap--column.s-gap${space === 'default' ? '' : `--${space}`} {
                    column-gap: sugar.space(${space});
                }`);

    });

    return vars;
}
