// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginDepthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginDepthFunctionInterface as interface };

export interface IPostcssSugarPluginDepthFunctionParams {
    depth: string;
}

export default function depth({
    params,
}: {
    params: Partial<IPostcssSugarPluginDepthFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginDepthFunctionParams = {
        ...params,
    };

    let intDepth = parseInt(finalParams.depth);
    if (typeof finalParams.depth !== 'number') {
        return finalParams.depth;
    } else {
        return __STheme.cssVar(`depth.${intDepth}`, false);
    }
}
