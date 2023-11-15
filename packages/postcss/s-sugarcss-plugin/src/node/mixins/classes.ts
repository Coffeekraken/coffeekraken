import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.classes
 * @namespace      node.mixin
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        stable
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc:
 *
 * - ```@s.border.classes;```
 * - ```@s.clearfix.classes;```
 * - ```@s.color.classes;```
 * - ```@s.container.classes;```
 * - ```@s.cursor.classes;```
 * - ```@s.depth.classes;```
 * - ```@s.disabled.classes;```
 * - ```@s.display.classes;```
 * - ```@s.fit.classes;```
 * - ```@s.flex.classes;```
 * - ```@s.float.classes;```
 * - ```@s.font.classes;```
 * - ```@s.format.classes;```
 * - ```@s.gap.classes;```
 * - ```@s.gradient.classes;```
 * - ```@s.grid.classes;```
 * - ```@s.group.classes;```
 * - ```@s.grow.classes;```
 * - ```@s.hide.classes;```
 * - ```@s.layout.classes;```
 * - ```@s.link.classes;```
 * - ```@s.margin.classes;```
 * - ```@s.offsize.classes;```
 * - ```@s.opacity.classes;```
 * - ```@s.order.classes;```
 * - ```@s.overflow.classes;```
 * - ```@s.padding.classes;```
 * - ```@s.pointer.classes;```
 * - ```@s.position.classes;```
 * - ```@s.ratio.classes;```
 * - ```@s.scale.classes;```
 * - ```@s.scrollbar.classes;```
 * - ```@s.shape.classes;```
 * - ```@s.shrink.classes;```
 * - ```@s.spacing.classes;```
 * - ```@s.text.classes;```
 * - ```@s.transition.classes;```
 * - ```@s.truncate.classes;```
 * - ```@s.typo.classes;```
 * - ```@s.until.classes;```
 * - ```@s.userSelect.classes;```
 * - ```@s.visibility.classes;```
 * - ```@s.visually.classes;```
 * - ```@s.when.classes;```
 * - ```@s.whiteSpace.classes;```
 * - ```@s.width.classes;```
 *
 * @param           {Boolean}           [ui=true]           Specify if you want to generate also the ui classes (avatar, etc...)
 * @return        {Css}         The generated css
 *
 * @snippet         @s.classes
 *
 * @example        css
 * @s.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginClassesInterface extends __SInterface {
    static get _definition() {
        return {
            ui: {
                description:
                    'Specify if you want the UI classes to be generated or not',
                type: 'Boolean',
                default: true,
            },
        };
    }
}

export interface ISSugarcssPluginClassesParams {
    ui: boolean;
}

export { SSugarcssPluginClassesInterface as interface };

export default async function ({
    params,
    atRule,
    cache,
    sharedData,
    toCache,
    replaceWith,
}) {
    const finalParams: ISSugarcssPluginClassesParams = {
        ...params,
    };

    const cssArray: string[] = [
        '@s.border.classes;',
        '@s.clearfix.classes;',
        '@s.color.classes;',
        '@s.container.classes;',
        '@s.cursor.classes;',
        '@s.depth.classes;',
        '@s.disabled.classes;',
        '@s.display.classes;',
        '@s.fit.classes;',
        '@s.flex.classes;',
        '@s.float.classes;',
        '@s.font.classes;',
        '@s.format.classes;',
        '@s.gap.classes;',
        '@s.gradient.classes;',
        '@s.grid.classes;',
        '@s.group.classes;',
        '@s.grow.classes;',
        '@s.hide.classes;',
        '@s.layout.classes;',
        '@s.link.classes;',
        '@s.margin.classes;',
        '@s.offsize.classes;',
        '@s.opacity.classes;',
        '@s.order.classes;',
        '@s.overflow.classes;',
        '@s.padding.classes;',
        '@s.pointer.classes;',
        '@s.position.classes;',
        '@s.ratio.classes;',
        '@s.scale.classes;',
        '@s.scrollbar.classes;',
        '@s.shape.classes;',
        '@s.shrink.classes;',
        '@s.spacing.classes;',
        '@s.text.classes;',
        '@s.transition.classes;',
        '@s.truncate.classes;',
        '@s.typo.classes;',
        '@s.until.classes;',
        '@s.userSelect.classes;',
        '@s.visibility.classes;',
        '@s.visually.classes;',
        '@s.when.classes;',
        '@s.whiteSpace.classes;',
        '@s.width.classes;',
    ];

    if (finalParams.ui) {
        cssArray.unshift('@s.ui.classes;');
    }

    return cssArray;

    // const hash = `@s.classes.${__objectHash({
    //     finalParams,
    //     css: cssArray,
    //     theme: __STheme.hash(),
    // })}`;
    // const c = cache('@s.classes', hash, cssArray);
    // return c;
}
