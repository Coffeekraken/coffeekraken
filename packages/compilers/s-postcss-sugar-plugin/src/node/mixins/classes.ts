import __SInterface from '@coffeekraken/s-interface';
import __cacache from 'cacache';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
import __STheme from '@coffeekraken/s-theme';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      node.mixins.classes
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * \@sugar.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function ({ params, atRule, fromCache, replaceWith }) {
    const cssArray: string[] = [
        '@sugar.reset.styleguide;',
        '@sugar.ui.classes;',
        '@sugar.align.classes;',
        '@sugar.typo.classes;',
        '@sugar.layout.classes;',
        '@sugar.clearfix.classes;',
        '@sugar.color.classes;',
        '@sugar.fit.classes;',
        '@sugar.format.classes;',
        '@sugar.align.classes;',
        '@sugar.text.classes;',
        '@sugar.font.classes;',
        '@sugar.depth.classes;',
        '@sugar.disabled.classes;',
        '@sugar.flex.classes;',
        '@sugar.ratio.classes;',
        '@sugar.border.classes;',
        '@sugar.display.classes;',
        '@sugar.overflow.classes;',
        '@sugar.position.classes;',
        '@sugar.pointer.classes;',
        '@sugar.transition.classes;',
        '@sugar.margin.classes;',
        '@sugar.opacity.classes;',
        '@sugar.scale.classes;',
        '@sugar.padding.classes;',
        '@sugar.visibility.classes;',
        '@sugar.visually.classes;',
        '@sugar.truncate.classes;',
        '@sugar.until.classes;',
        '@sugar.scrollbar.classes;',
        '@sugar.width.classes;',
        '@sugar.components.classes;',
        '@sugar.whiteSpace.classes;',
    ];

    const hash = `classes-${__objectHash({
        css: cssArray,
        theme: __STheme.hash(),
    })}`;

    // from cache
    const cached = await fromCache(hash, '@sugar.classes;');
    if (cached) {
        console.log(
            `<green>[postcss]</green> Statement "<cyan>@sugar.classes;</cyan>" getted from cache`,
        );
        return cached;
    }

    console.log(
        '<yellow>[postcss]</yellow> Compiling the "<cyan>@sugar.classes;</cyan>" statement. ',
    );
    console.log(
        `<yellow>[postcss]</yellow> This can take some time but will be cached <cyan>until you change your theme configuration</cyan>....`,
    );

    // add caching statements
    cssArray.unshift(`/* CACHE:${hash}:@sugar.classes; */`);
    cssArray.push(`/* ENDCACHE:${hash}:@sugar.classes; */`);

    return cssArray;
}
