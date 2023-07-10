import __SInterface from '@coffeekraken/s-interface';

import __faker from 'faker';

/**
 * @name           classes
 * @as              @sugar.userSelect.classes
 * @namespace      node.mixin.userSelect
 * @type           PostcssMixin
 * @interface   ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the user-select helper classes like ```.s-user-select:none```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.userSelect.classes
 *
 * @example        css
 * \@sugar.userSelect.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUserSelectClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUserSelectClassesParams {}

export { postcssSugarPluginUserSelectClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUserSelectClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUserSelectClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(`
      /**
        * @name          User select
        * @namespace          sugar.style.helpers.userSelect
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/user-select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some user-select style on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.userSelect.classes;
        * 
        * @cssClass         s-user-select:all             Apply the \`user-select\` to \`all\`
        * @cssClass         s-user-select:auto             Apply the \`user-select\` to \`auto\`
        * @cssClass         s-user-select:none             Apply the \`user-select\` to \`none\`
        * @cssClass         s-user-select:text             Apply the \`user-select\` to \`text\`
        * 
        * @example        html          All
        *   <p class="s-user-select:all">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            auto
        *   <p class="s-user-select:auto">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            none
        *   <p class="s-user-select:none">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                text
        *   <p class="s-user-select:text">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);

    ['all', 'auto', 'none', 'text'].forEach((value) => {
        vars.comment(
            `/**
    * @name          s-user-select:${value}
    * @namespace          sugar.style.helpers.userSelect
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" user-select style to any HTMLElement
    * 
    * @example        html
    * <div class="s-user-select:${value}">${__faker.lorem.paragraph()}</div>
    */
   `,
        ).code(
            `
    .s-user-select--${value} {
        user-select: ${value};
    }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
