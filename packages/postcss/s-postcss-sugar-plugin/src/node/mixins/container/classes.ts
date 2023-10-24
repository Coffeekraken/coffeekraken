import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @s.container.classes
 * @namespace      node.mixin.container
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the layout helper classes like s-container, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.container.classes
 *
 * @example        css
 * @s.container.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginContainerClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginContainerClassesParams {}

export { postcssSugarPluginContainerClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginContainerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginContainerClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const layoutConfig = __STheme.get('layout');

    const containers = layoutConfig.container;
    Object.keys(containers).forEach((containerName) => {
        const cls =
            containerName === 'default'
                ? `s-container`
                : `s-container:${containerName}`;

        vars.comment(
            () => `/**
      * @name          ${cls}
      * @namespace          sugar.style.helpers.container
      * @type               CssClass
      * @platform       css
      * @status         stable
      * 
      * This class allows you to apply the "<yellow>${containerName}</yellow>" container styling to any HTMLElement
      * 
      * @example        html
      * <div class="${cls.replace(':', ':')}">
      *     <h1 class="s-h1">Hello world</h1>
      * </div>
      */
    `,
        ).code(
            `
      .${cls.replace(':', '-')} {
                @s.container(${containerName});
        }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
