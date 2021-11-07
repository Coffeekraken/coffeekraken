import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginScalableFunctionInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                value: {
                    type: 'String|Number',
                    required: true,
                },
            })
        );
    }
}
export { postcssSugarPluginScalableFunctionInterface as interface };

export interface IPostcssSugarPluginScalableFunctionParams {
    value: string | number;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginScalableFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginScalableFunctionParams = {
        value: '',
        ...params,
    };

    return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
