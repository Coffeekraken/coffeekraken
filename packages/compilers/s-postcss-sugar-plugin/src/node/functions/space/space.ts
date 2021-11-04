import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
    static definition = {
        space: {
            type: 'String',
            values: Object.keys(__STheme.config('space')),
            default: 'default',
            required: true,
        },
    };
}
export { postcssSugarPluginSpaceFunctionInterface as interface };

export interface IPostcssSugarPluginSpaceFunctionParams {
    space: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginSpaceFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginSpaceFunctionParams = {
        space: '',
        ...params,
    };

    const space = finalParams.space;

    if (__STheme.config('space')[space] === undefined) return space;

    const spaces = space.split(' ').map((s) => {
        const size = __STheme.config(`space.${s}`);
        if (!size) return size;
        return `var(${`--s-theme-space-${s}`}, ${size})`;
    });

    return spaces.join(' ');
}
