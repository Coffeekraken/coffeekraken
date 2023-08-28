"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
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
class postcssSugarPluginViewMixinInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginViewMixinInterface;
function _getFinalViewPath(viewDotPath, settings) {
    // remove the "views.*" in the
    viewDotPath = viewDotPath.replace(/views\./, '');
    let finalViewPath = viewDotPath, handledViewsExtensions = ['twig', 'blade.php'];
    if (fs_1.default.existsSync(viewDotPath)) {
        return viewDotPath;
    }
    // direct from the rootDirs
    for (let i = 0; i < settings.viewsRootDirs.length; i++) {
        const rootDir = settings.viewsRootDirs[i];
        if (fs_1.default.existsSync(rootDir + '/' + viewDotPath)) {
            return `${rootDir}/${viewDotPath}`;
        }
    }
    // doted path
    for (let i = 0; i < settings.viewsRootDirs.length; i++) {
        const rootDir = settings.viewsRootDirs[i], parts = viewDotPath.split('.'), viewName = parts.pop(), viewPath = viewDotPath.replace(/\./g, '/'), globalPart = '{' + handledViewsExtensions.join(',') + '}';
        const potentialViewGlob1 = `${rootDir}/${viewPath}.${globalPart}`, potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globalPart}`;
        const matches = glob_1.default.sync(potentialViewGlob1);
        if (matches.length) {
            for (let j = 0; j < matches.length; j++) {
                const potentialPath = matches[j];
                if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/))
                    continue;
                if (fs_1.default.existsSync(potentialPath)) {
                    finalViewPath = potentialPath;
                    break;
                }
            }
        }
        else {
            const matches = glob_1.default.sync(potentialViewGlob2, {
                absolute: true,
            });
            if (matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    const potentialPath = matches[j];
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/))
                        continue;
                    if (fs_1.default.existsSync(potentialPath)) {
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
            if (fs_1.default.existsSync(viewDotPath)) {
                finalViewPath = viewDotPath;
            }
        }
    }
    if (finalViewPath === viewDotPath) {
        throw new Error(`[SViewRenderer] No suitable view found for "${viewDotPath}"...`);
    }
    return finalViewPath;
}
function default_1({ params, atRule, settings, postcss, getRoot, postcssApi, }) {
    const finalParams = Object.assign({ viewPath: null, scope: ['bare', 'lnf'] }, (params !== null && params !== void 0 ? params : {}));
    const finalViewPath = _getFinalViewPath(finalParams.viewPath, settings), viewCssPath = finalViewPath
        .replace(/\.blade\.php$/, '.blade')
        .replace(/\.[a-zA-Z0-9]+$/, ''), viewBareCssPath = `${viewCssPath}.bare.css`, viewLnfCssPath = `${viewCssPath}.${finalParams.lnf ? `${finalParams.lnf}.` : ''}lnf.css`;
    // bare
    if (fs_1.default.existsSync(viewBareCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import url("${viewBareCssPath}");`));
        }
        else {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import "${viewBareCssPath}";`));
        }
    }
    // lnf
    if (fs_1.default.existsSync(viewLnfCssPath)) {
        if (settings.target === 'vite') {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import url("${viewLnfCssPath}");`));
        }
        else {
            atRule.parent.insertBefore(atRule, postcss.parse(`@import "${viewLnfCssPath}";`));
        }
    }
    atRule.remove();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFDUCxnRkFBZ0Y7Z0JBQ3BGLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxlQUFlO2dCQUN0QixXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDZ0QseURBQVM7QUFRMUQsU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsUUFBUTtJQUM1Qyw4QkFBOEI7SUFDOUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRWpELElBQUksYUFBYSxHQUFHLFdBQVcsRUFDM0Isc0JBQXNCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFbkQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlCLE9BQU8s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