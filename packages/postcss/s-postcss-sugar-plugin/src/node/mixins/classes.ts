import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.classes
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.classes;
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
        '@sugar.typo.classes;',
        '@sugar.container.classes;',
        '@sugar.grid.classes;',
        '@sugar.group.classes;',
        '@sugar.layout.classes;',
        '@sugar.clearfix.classes;',
        '@sugar.cursor.classes;',
        '@sugar.color.classes;',
        '@sugar.fit.classes;',
        '@sugar.format.classes;',
        '@sugar.link.classes;',
        '@sugar.gap.classes;',
        '@sugar.height.classes;',
        '@sugar.hide.classes;',
        '@sugar.text.classes;',
        '@sugar.font.classes;',
        '@sugar.depth.classes;',
        '@sugar.disabled.classes;',
        '@sugar.flex.classes;',
        '@sugar.float.classes;',
        '@sugar.ratio.classes;',
        '@sugar.border.classes;',
        '@sugar.display.classes;',
        '@sugar.overflow.classes;',
        '@sugar.position.classes;',
        '@sugar.pointer.classes;',
        '@sugar.transition.classes;',
        '@sugar.margin.classes;',
        '@sugar.offsize.classes;',
        '@sugar.order.classes;',
        '@sugar.opacity.classes;',
        '@sugar.scale.classes;',
        '@sugar.padding.classes;',
        '@sugar.spacing.classes;',
        '@sugar.userSelect.classes;',
        '@sugar.visibility.classes;',
        '@sugar.visually.classes;',
        '@sugar.truncate.classes;',
        '@sugar.until.classes;',
        '@sugar.when.classes;',
        '@sugar.scrollbar.classes;',
        '@sugar.shape.classes;',
        '@sugar.width.classes;',
        // '@sugar.components.classes;',
        '@sugar.whiteSpace.classes;',
    ];

    if (finalParams.ui) {
        cssArray.unshift('@sugar.ui.classes;');
    }

    cssArray.unshift('@sugar.reset;');

    return cssArray;

    // const hash = `@sugar.classes.${__objectHash({
    //     finalParams,
    //     css: cssArray,
    //     theme: __STheme.hash(),
    // })}`;
    // const c = cache('@sugar.classes', hash, cssArray);
    // return c;
}
