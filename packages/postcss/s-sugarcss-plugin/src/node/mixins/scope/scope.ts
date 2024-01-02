import __SInterface from '@coffeekraken/s-interface';
import { __intersection } from '@coffeekraken/sugar/array';

class SSugarcssPluginScopeMixinInterface extends __SInterface {
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
export { SSugarcssPluginScopeMixinInterface as interface };

export interface SSugarcssPluginScopeMixinParams {
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
    sharedData,
}: {
    params: Partial<SSugarcssPluginScopeMixinParams>;
    atRule: any;
    registerPostProcessor: Function;
    replaceWith: Function;
    sharedData: any;
}) {
    const finalParams = <SSugarcssPluginScopeMixinParams>{
        scope: [],
        ...(params ?? {}),
    };

    atRule.name = 'media';
    atRule.params = `s-scope:${finalParams.scope.join(',')}`;

    registerPostProcessor((root) => {
        let currentRule = atRule.parent;

        while (currentRule !== root) {
            if (!currentRule.name) {
                currentRule = currentRule.parent;
                continue;
            }
            if (currentRule.params.startsWith('s-scope:only:')) {
                const onlyArray = currentRule.params
                    .trim()
                    .replace('s-scope:only:', '')
                    .split(',');
                if (!__intersection(finalParams.scope, onlyArray).length) {
                    atRule.remove();
                }
            }

            currentRule = currentRule.parent;
        }

        atRule.replaceWith(atRule.nodes);
    });
}
