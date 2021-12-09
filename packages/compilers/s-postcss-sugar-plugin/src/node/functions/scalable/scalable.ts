import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          scalable
 * @namespace     node.function.scalable
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get value that will be scaled using the "--s-scale" variable.
 * This allows you to make your components aware of classes like "s-scale-10", etc...
 *
 * @param       {Number}        value      The value you want to be scalable
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    padding: sugar.scalable(20px);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginScalableFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'String|Number',
                required: true,
            },
        };
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
