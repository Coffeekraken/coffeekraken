import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';

class postcssSugarPluginScopeNoMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scopes: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScopeNoMixinInterface as interface };

export interface postcssSugarPluginScopeNoMixinParams {
    scopes: string[];
}

/**
 * @name           no
 * @namespace      node.mixins.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to exclude some scope(s) from the generated css.
 * Scopes are usually "bare" or/and "lnf" (look and feel).
 * This is usefull for example if you want all the classes to apply bare styling
 * without any look and feel that you handle by yourself.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope.no(lnf) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    const finalParams = <postcssSugarPluginScopeNoMixinParams>{
        scopes: [],
        ...(params ?? {}),
    };

    // _noScopesStack.push(finalParams.scopes.join(','));
    // sharedData.noScopes = finalParams.scopes;

    // console.log(finalParams);
    // atRule.replaceWith(atRule.nodes);

    // console.log('RESTORE');
    // _noScopesStack.pop();
    // if (_noScopesStack.length) {
    //     // @ts-ignore
    //     sharedData.noScopes = _noScopesStack.slice(-1).split(',');
    // } else {
    //     sharedData.noScopes = [];
    // }
}
