import __SInterface from '@coffeekraken/s-interface';

import __fs from 'fs';
import __glob from 'glob';

/**
 * @name           view
 * @as              @sugar.view.view
 * @namespace      node.mixin.view
 * @type           PostcssMixin
 * @interface   ./view
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to import a view css like "sections.hero".
 *
 * @param           {String}            viewPath            The view path to import the css from
 * @param           {String}            [lnf=null]          Specify a lnf for the view if this specific view exports some
 * @param           {('bare','lnf')[]}          [scope=['bare','lnf]]           The scope you want to import
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.view(sections.hero);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginViewMixinInterface extends __SInterface {
    static get _definition() {
        return {
            viewPath: {
                type: 'String',
                title: 'View path',
                description:
                    'Specify the view path of the view to import like "sugar.sections.hero", etc...',
                required: true,
            },
            lnf: {
                type: 'String',
                title: 'Look and feel',
                description: 'Specify the look and feel you want to import',
                default: null,
            },
            scope: {
                type: 'Array<String>',
                title: 'Scope',
                description: 'Specify the scope you want to import',
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginViewMixinInterface as interface };

export interface postcssSugarPluginViewMixinParams {
    viewPath: string;
    lnf: string;
    scope: ('bare' | 'lnf')[];
}

function _getFinalViewPath(viewDotPath, settings) {
    // remove the "views.*" in the
    viewDotPath = viewDotPath.replace(/views\./, '');

    let finalViewPath = viewDotPath,
        handledViewsExtensions = ['twig', 'blade.php'];

    if (__fs.existsSync(viewDotPath)) {
        return viewDotPath;
    }

    // direct from the rootDirs
    for (let i = 0; i < settings.viewsRootDirs.length; i++) {
        const rootDir = settings.viewsRootDirs[i];
        if (__fs.existsSync(rootDir + '/' + viewDotPath)) {
            return `${rootDir}/${viewDotPath}`;
        }
    }

    // doted path
    for (let i = 0; i < settings.viewsRootDirs.length; i++) {
        const rootDir = settings.viewsRootDirs[i],
            parts = viewDotPath.split('.'),
            viewName = parts.pop(),
            viewPath = viewDotPath.replace(/\./g, '/'),
            globalPart = '{' + handledViewsExtensions.join(',') + '}';

        const potentialViewGlob1 = `${rootDir}/${viewPath}.${globalPart}`,
            potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globalPart}`;

        const matches = __glob.sync(potentialViewGlob1);

        if (matches.length) {
            for (let j = 0; j < matches.length; j++) {
                const potentialPath = matches[j];
                if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) continue;
                if (__fs.existsSync(potentialPath)) {
                    finalViewPath = potentialPath;
                    break;
                }
            }
        } else {
            const matches = __glob.sync(potentialViewGlob2, {
                absolute: true,
            });

            if (matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    const potentialPath = matches[j];
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) continue;
                    if (__fs.existsSync(potentialPath)) {
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            }
        }
    }

    // detect and save the view doted path or the view template string
    if (
        viewDotPath.split(' ').length === 1 &&
        viewDotPath.trim() === viewDotPath
    ) {
        if (viewDotPath.match(/^\//)) {
            if (__fs.existsSync(viewDotPath)) {
                finalViewPath = viewDotPath;
            }
        }
    }

    if (finalViewPath === viewDotPath) {
        throw new Error(
            `[SViewRenderer] No suitable view found for "${viewDotPath}"...`,
        );
    }

    return finalViewPath;
}

export default function ({
    params,
    atRule,
    settings,
    postcss,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginViewMixinParams>;
    atRule: any;
    settings: any;
    postcss: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginViewMixinParams>{
        viewPath: null,
        scope: ['bare', 'lnf'],
        ...(params ?? {}),
    };

    const finalViewPath = _getFinalViewPath(finalParams.viewPath, settings),
        viewCssPath = finalViewPath
            .replace(/\.blade\.php$/, '.blade')
            .replace(/\.[a-zA-Z0-9]+$/, ''),
        viewBareCssPath = `${viewCssPath}.bare.css`,
        viewLnfCssPath = `${viewCssPath}.${
            finalParams.lnf ? `${finalParams.lnf}.` : ''
        }lnf.css`;

    // bare
    if (__fs.existsSync(viewBareCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(
                atRule,
                postcss.parse(`@import url("${viewBareCssPath}");`),
            );
        } else {
            atRule.parent.insertBefore(
                atRule,
                postcss.parse(`@import "${viewBareCssPath}";`),
            );
        }
    }

    // lnf
    if (__fs.existsSync(viewLnfCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(
                atRule,
                postcss.parse(`@import url("${viewLnfCssPath}");`),
            );
        } else {
            atRule.parent.insertBefore(
                atRule,
                postcss.parse(`@import "${viewLnfCssPath}";`),
            );
        }
    }

    atRule.remove();
}
