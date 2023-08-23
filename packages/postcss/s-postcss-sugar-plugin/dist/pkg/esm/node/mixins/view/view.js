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
                description: 'Specify the view path of the view to import like "sugar.sections.hero", etc...',
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
function _getFinalViewPath(viewDotPath, settings) {
    // remove the "views.*" in the
    viewDotPath = viewDotPath.replace(/views\./, '');
    let finalViewPath = viewDotPath, handledViewsExtensions = ['twig', 'blade.php'];
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
        const rootDir = settings.viewsRootDirs[i], parts = viewDotPath.split('.'), viewName = parts.pop(), viewPath = viewDotPath.replace(/\./g, '/'), globalPart = '{' + handledViewsExtensions.join(',') + '}';
        const potentialViewGlob1 = `${rootDir}/${viewPath}.${globalPart}`, potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globalPart}`;
        const matches = __glob.sync(potentialViewGlob1);
        if (matches.length) {
            for (let j = 0; j < matches.length; j++) {
                const potentialPath = matches[j];
                if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/))
                    continue;
                if (__fs.existsSync(potentialPath)) {
                    finalViewPath = potentialPath;
                    break;
                }
            }
        }
        else {
            const matches = __glob.sync(potentialViewGlob2, {
                absolute: true,
            });
            if (matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    const potentialPath = matches[j];
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/))
                        continue;
                    if (__fs.existsSync(potentialPath)) {
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            }
        }
    }
    // detect and save the view doted path or the view template string
    if (viewDotPath.split(' ').length === 1 &&
        viewDotPath.trim() === viewDotPath) {
        if (viewDotPath.match(/^\//)) {
            if (__fs.existsSync(viewDotPath)) {
                finalViewPath = viewDotPath;
            }
        }
    }
    if (finalViewPath === viewDotPath) {
        throw new Error(`[SViewRenderer] No suitable view found for "${viewDotPath}"...`);
    }
    return finalViewPath;
}
export default function ({ params, atRule, settings, postcss, postcssApi, }) {
    const finalParams = Object.assign({ viewPath: null, scope: ['bare', 'lnf'] }, (params !== null && params !== void 0 ? params : {}));
    const finalViewPath = _getFinalViewPath(finalParams.viewPath, settings), viewCssPath = finalViewPath
        .replace(/\.blade\.php$/, '.blade')
        .replace(/\.[a-zA-Z0-9]+$/, ''), viewBareCssPath = `${viewCssPath}.bare.css`, viewLnfCssPath = `${viewCssPath}.${finalParams.lnf ? `${finalParams.lnf}.` : ''}lnf.css`;
    // bare
    if (__fs.existsSync(viewBareCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import url("${viewBareCssPath}");`));
        }
        else {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import "${viewBareCssPath}";`));
        }
    }
    // lnf
    if (__fs.existsSync(viewLnfCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import url("${viewLnfCssPath}");`));
        }
        else {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import "${viewLnfCssPath}";`));
        }
    }
    atRule.remove();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQ1AsZ0ZBQWdGO2dCQUNwRixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBUTdELFNBQVMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFFBQVE7SUFDNUMsOEJBQThCO0lBQzlCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVqRCxJQUFJLGFBQWEsR0FBRyxXQUFXLEVBQzNCLHNCQUFzQixHQUFHLENBQUMsTUFB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