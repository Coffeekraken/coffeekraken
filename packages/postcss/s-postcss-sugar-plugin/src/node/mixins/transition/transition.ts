import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           transition
 * @as              @s.transition
 * @namespace      node.mixin.transition
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the needed css to apply a transition setted in
 * the config.theme.transition configuration stack like "slow", "default" and "fast"
 *
 * @param           {String}        [name='default']            The transition you want to apply
 * @return        {Css}         The generated css
 *
 * @snippet         @s.transition($1)
 *
 * @example        css
 * .my-cool-element {
 *      @s.transition(fast);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginTransitionMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'default',
            },
        };
    }
}
export { postcssSugarPluginTransitionMixinInterface as interface };

export interface postcssSugarPluginTransitionMixinParams {
    name: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<postcssSugarPluginTransitionMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginTransitionMixinParams>{
        ...(params ?? {}),
    };
    const vars: string[] = [
        `transition: s.transition(${finalParams.name}) ${
            finalParams.name !== 'default' ? '!important' : ''
        };`,
    ];

    return vars;
}
