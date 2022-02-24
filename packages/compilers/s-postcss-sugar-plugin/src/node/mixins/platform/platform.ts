import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __fs from 'fs';

/**
 * @name           platform
 * @namespace      node.mixins.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to display correctly a "platform" icon like
 * css, node, js, php, etc...
 *
 * @param         {IPostcssSugarPluginAssetPlatformParams}    params      The parameters object
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-platform {
 *    \@sugar.platform(css);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginAssetPlatformInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: 'String',
                values: ['js', 'node', 'ts', 'php'],
                required: true,
            },
        };
    }
}

export interface IPostcssSugarPluginAssetPlatformParams {
    platform: string;
}

export { postcssSugarPluginAssetPlatformInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginAssetPlatformParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginAssetPlatformParams = {
        platform: '',
        ...params,
    };

    const vars: string[] = [];

    if (
        !__fs.readFileSync(
            `${__dirname()}/platforms/${finalParams.platform}.svg`,
        )
    ) {
        throw new Error(
            `<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`,
        );
    }
    const svgStr = __fs.readFileSync(
        `${__dirname()}/platforms/${finalParams.platform}.svg`,
        'utf8',
    );

    vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${__base64.encrypt(
        svgStr,
    )}");
  `);

    return vars;
}
