import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @sugar.shape.classes
 * @namespace      node.mixin.shape
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the shape helper classes like s-shape:default, s-shape:square and s-shape:pill
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.shape.classes
 *
 * @example        css
 * \@sugar.shape.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginShapeClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginShapeClassesParams {}

export { postcssSugarPluginShapeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginShapeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginShapeClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Shape
        * @namespace          sugar.style.helpers.shape
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/shape
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a shape to any elements that support it using the
        * \`border-radius: sugar.border.radius(shape);\` statement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.shape.classes;
        * 
        * @cssClass                 s-shape:default             Apply the default shape (default border radius)
        * @cssClass                 s-shape:square              Apply the square shape
        * @cssClass                 s-shape:pill                Apply the pill shape
        * 
        * @example        html              Shape on buttons
        * <a class="s-btn s-color:accent s-shape:default">Default shape</a>
        * <a class="s-btn s-color:accent s-shape:square">Square shape</a>
        * <a class="s-btn s-color:accent s-shape:pill">Pill shape</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
* @name            s-shape:default
* @namespace          sugar.style.helpers.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:default">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`,
    ).code(
        `
.s-shape--default {
    @sugar.shape(default);
}`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
* @name            s-shape:square
* @namespace          sugar.style.helpers.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:square">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`,
    ).code(
        `
.s-shape--square {
    @sugar.shape(square);
}`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
* @name            s-shape:pill
* @namespace          sugar.style.helpers.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:pill">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`,
    ).code(
        `
.s-shape--pill {
    @sugar.shape(pill);
}`,
        { type: 'CssClass' },
    );

    return vars;
}
