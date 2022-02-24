import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          transition
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      transition: sugar.transition(fast);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(__STheme.config('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginTransitionFunctionInterface as interface };

export interface IPostcssSugarPluginTransitionFunctionParams {
    name: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginTransitionFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginTransitionFunctionParams = {
        name: 'default',
        ...params,
    };

    if (__STheme.config('transition')[finalParams.name] === undefined)
        return finalParams.name;

    const transitions = finalParams.name.split(' ').map((t) => {
        const transition = __STheme.config(`transition.${t}`);
        if (!transition) return transition;
        return `var(${`--s-theme-transition-${t}`}, ${transition})`;
    });

    return transitions.join(' ');
}
