import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                radius: {
                    type: 'String',
                    values: Object.keys(__STheme.config('border.radius')),
                    default: 'default',
                    required: true,
                },
            })
        );
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };

export interface IPostcssSugarPluginBorderRadiusFunctionParams {
    radius: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginBorderRadiusFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginBorderRadiusFunctionParams = {
        radius: '',
        ...params,
    };

    const radius = finalParams.radius;

    if (__STheme.config('border.radius')[radius] === undefined) return radius;

    const radiuses = radius.split(' ').map((s) => {
        // const radius = __STheme.config(`border.radius.${s}`);
        // if (!radius) return radius;
        return `var(${`--s-theme-border-radius-${s}`}) ${
            finalParams.radius !== 'default' ? '!important' : ''
        }`;
    });

    return radiuses.join(' ');
}
