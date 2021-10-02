import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            values: Object.keys(__theme().config('transition')),
            default: 'default',
            required: true,
        },
    };
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

    if (__theme().config('transition')[finalParams.name] === undefined)
        return finalParams.name;

    const transitions = finalParams.name.split(' ').map((t) => {
        const transition = __theme().config(`transition.${t}`);
        if (!transition) return transition;
        return `var(${__minifyVar(
            `--s-theme-transition-${t}`,
        )}, ${transition})`;
    });

    return transitions.join(' ');
}
