import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          transition
 * @as            s.transition
 * @namespace     node.function.transition
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./transition
 * @status        stable
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.transition($1)
 *
 * @example       css
 * .my-element {
 *      transition: s.transition(fast);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginTransitionFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(__STheme.get('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginTransitionFunctionInterface as interface };

export interface ISSugarcssPluginTransitionFunctionParams {
    name: string;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<ISSugarcssPluginTransitionFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: ISSugarcssPluginTransitionFunctionParams = {
        name: 'default',
        ...params,
    };

    const transition = finalParams.name;
    let val;

    // theme value
    val = themeValueProxy(transition);

    // try to get the transition with the pased
    const newVal = __STheme.getSafe(`transition.${val}`);
    if (newVal !== undefined) {
        val = newVal;
    }

    // default return simply his value
    return `${val}`;
}
