import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginScopeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description:
                    'Specify the scope(s) you want to generate for the enclosed mixins calls',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScopeMixinInterface as interface };

export interface postcssSugarPluginScopeMixinParams {
    scope: string[];
}

/**
 * @name           scope
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you want to all the called mixins that have a "$scope" parameter like `@s.ui.button`, `@s.ui.avatar`, etc...
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope ($1) { $2 }
 * @s.scope $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope bare {
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
}: {
    params: Partial<postcssSugarPluginScopeMixinParams>;
    atRule: any;
    registerPostProcessor: Function;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginScopeMixinParams>{
        scope: [],
        ...(params ?? {}),
    };

    registerPostProcessor((root) => {
        root.walkAtRules(/sugar\.scope/, (at) => {
            at.replaceWith(at.nodes);
        });
    });

    atRule.walkAtRules((n) => {
        // console.log('d', n.name);
        if (n.type !== 'atrule' || !n.name.startsWith('sugar.')) {
            return;
        }
        // save the wanted scope(s) inside the atRule.
        // this will be handled by the postcssSugarPlugin main file
        // to compute the final "scope" param to pass
        n._scope = finalParams.scope;
    });
}
