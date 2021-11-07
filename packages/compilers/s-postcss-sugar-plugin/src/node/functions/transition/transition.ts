import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                name: {
                    type: 'String',
                    values: Object.keys(__STheme.config('transition')),
                    default: 'default',
                    required: true,
                },
            })
        );
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
