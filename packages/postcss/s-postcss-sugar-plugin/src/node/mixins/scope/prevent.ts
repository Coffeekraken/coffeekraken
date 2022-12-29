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
 * @example        css
 * @sugar.scope.prevent() {
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
    replaceWith,
    postcssApi,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
    sharedData: any;
    atRule: any;
    replaceWith: Function;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginScopePreventMixinParams>{
        scopes: [],
        ...(params ?? {}),
    };
    atRule.walkRules((rule) => {
        rule._preventLod = true;
        if (!sharedData._preventLodSelectors) {
            sharedData._preventLodSelectors = [];
        }
        sharedData._preventLodSelectors = [
            ...sharedData._preventLodSelectors,
            ...rule.selectors,
        ];
    });
    atRule.replaceWith(atRule.nodes);
}
