import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginScopEexcludeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description:
                    "Specify the scope(s) you don't want to generate for the enclosed css",
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScopEexcludeMixinInterface as interface };

export interface SSugarcssPluginScopeExcludeMixinParams {
    scope: string[];
}

/**
 * @name           exclude
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you don't want to all the enclosed css
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope.exclude ($1) { $2 }
 * @s.scope.exclude $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope.exclude lnf {
 *      @s.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    registerPostProcessor,
    replaceWith,
    sharedData,
}: {
    params: Partial<SSugarcssPluginScopeExcludeMixinParams>;
    atRule: any;
    registerPostProcessor: Function;
    replaceWith: Function;
    sharedData: any;
}) {
    const finalParams = <SSugarcssPluginScopeExcludeMixinParams>{
        scope: [],
        ...(params ?? {}),
    };

    atRule._scopeExclude = atRule._scopeExclude ?? finalParams.scope;
}
