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
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @param           {Boolean}           [ui=true]           Specify if you want to generate also the ui classes (avatar, etc...)
 * @return        {Css}         The generated css
 *
 * @snippet         @s.classes
 *
 * @example        css
 * \@s.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginClassesInterface extends __SInterface {
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

export interface IPostcssSugarPluginClassesParams {
    ui: boolean;
}

export { postcssSugarPluginClassesInterface as interface };

export default async function ({
    params,
    atRule,
    cache,
    sharedData,
    toCache,
    replaceWith,
}) {
    const finalParams: IPostcssSugarPluginClassesParams = {
        ...params,
    };

    const cssArray: string[] = [
        // '@s.typo.classes;',
        '@s.container.classes;',
        // '@s.grid.classes;',
        '@s.group.classes;',
        // '@s.gradient.classes;',
        '@s.layout.classes;',
        '@s.clearfix.classes;',
        '@s.cursor.classes;',
        '@s.color.classes;',
        '@s.fit.classes;',
        // '@s.format.classes;',
        '@s.link.classes;',
        '@s.gap.classes;',
        '@s.grow.classes;',
        '@s.shrink.classes;',
        '@s.hide.classes;',
        '@s.text.classes;',
        '@s.font.classes;',
        // '@s.depth.classes;',
        '@s.disabled.classes;',
        '@s.flex.classes;',
        '@s.float.classes;',
        '@s.ratio.classes;',
        '@s.border.classes;',
        '@s.display.classes;',
        '@s.overflow.classes;',
        '@s.position.classes;',
        '@s.pointer.classes;',
        '@s.transition.classes;',
        '@s.margin.classes;',
        // '@s.offsize.classes;',
        '@s.order.classes;',
        '@s.opacity.classes;',
        '@s.scale.classes;',
        '@s.padding.classes;',
        '@s.spacing.classes;',
        '@s.userSelect.classes;',
        '@s.visibility.classes;',
        '@s.visually.classes;',
        '@s.truncate.classes;',
        // '@s.until.classes;',
        // '@s.when.classes;',
        '@s.scrollbar.classes;',
        '@s.shape.classes;',
        '@s.width.classes;',
        '@s.whiteSpace.classes;',
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
