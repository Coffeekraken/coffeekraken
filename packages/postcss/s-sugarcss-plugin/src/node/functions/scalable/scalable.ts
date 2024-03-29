import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          scalable
 * @as            s.scalable
 * @namespace     node.function.scalable
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./scalable
 * @status        stable
 *
 * This function allows you to get value that will be scaled using the "--s-scale" variable.
 * This allows you to make your components aware of classes like "s-scale-10", etc...
 * The resulting value of this will be affected by the --s-scale-global variable that you can change
 * using the `@s.scale.global(0.9)` mixin...
 *
 * @param       {Number}        value      The value you want to be scalable
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.scalable($1)
 *
 * @example       css
 * .my-element {
 *    padding: s.scalable(20px);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginScalableFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'String|Number',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScalableFunctionInterface as interface };

export interface ISSugarcssPluginScalableFunctionParams {
    value: string | number;
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginScalableFunctionParams>;
}) {
    const finalParams: ISSugarcssPluginScalableFunctionParams = {
        value: '',
        ...params,
    };

    return `calc(${finalParams.value} * var(--s-scale, 1) * var(--s-scale-global, 1))`;
}
