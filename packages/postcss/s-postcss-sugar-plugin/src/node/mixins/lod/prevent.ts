import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';

class postcssSugarPluginScopePreventMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopePreventMixinInterface as interface };

export interface postcssSugarPluginScopePreventMixinParams {}

/**
 * @name           prevent
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to mark some css as not using the "scopes" feature.
 * This mean that your inside rules selectors will not be affected and will not
 * have any ".s-scope..." classes added
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @sugar.lod.prevent
 * \@sugar.lod.prevent {
 *      $1
 * }
 * 
 * @example        css
 * \@sugar.lod.prevent() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _noScopesStack: string[] = [];
export default function ({
    params,
    sharedData,
    atRule,
    settings,
    postcssApi,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
    sharedData: any;
    atRule: any;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginScopePreventMixinParams>{
        scopes: [],
        ...(params ?? {}),
    };

    // check if the lod feature is enabled or not
    if (!settings.lod?.enabled) {
        atRule.replaceWith(atRule.nodes);
        return;
    }

    atRule.nodes.forEach((node) => {
        if (!node.selector) {
            if (!atRule._parentRule) {
                atRule._parentRule = postcssApi.rule({
                    selector: '&',
                });
                atRule.append(atRule._parentRule);
            }
            atRule._parentRule.append(node);
        }
    });

    // check if the lod feature is enabled or not
    atRule.walkRules((rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            if (sel.match(/\.s-lod--prevent/)) return sel;
            return `.s-lod--prevent ${sel}`;
        });
    });

    atRule.replaceWith(atRule.nodes);
}
