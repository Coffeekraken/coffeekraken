import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginScopeOnlyMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description:
                    'Specify the scope(s) you want to generate for the enclosed css',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScopeOnlyMixinInterface as interface };

export interface SSugarcssPluginScopeOnlyMixinParams {
    scope: string[];
}

/**
 * @name           only
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you want to all the enclosed css
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope.only ($1) { $2 }
 * @s.scope.only $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope.only lnf {
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
    params: Partial<SSugarcssPluginScopeOnlyMixinParams>;
    atRule: any;
    registerPostProcessor: Function;
    replaceWith: Function;
    sharedData: any;
}) {
    const finalParams = <SSugarcssPluginScopeOnlyMixinParams>{
        scope: [],
        ...(params ?? {}),
    };

    atRule.name = 'media';
    atRule.params = `s-scope-only:${finalParams.scope.join(',')}`;

    registerPostProcessor(() => {
        atRule.replaceWith(atRule.nodes);
    });
}
