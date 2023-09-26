import __SInterface from '@coffeekraken/s-interface';
import { __base64 } from '@coffeekraken/sugar/crypto';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

/**
 * @name           platform
 * @namespace      node.mixin.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the css needed to display correctly a "platform" icon like
 * css, node, js, php, etc...
 *
 * @param         {IPostcssSugarPluginAssetPlatformParams}    params      The parameters object
 * @return        {Css}         The generated css
 *
 * @snippet         @s.platform($1)
 *
 * @example        css
 * .my-platform {
 *    \@s.platform(css);
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

    const svgPath = `${__packageRootDir(__dirname())}/src/img/platforms/${
        finalParams.platform
    }.svg`;

    if (!__fs.existsSync(svgPath)) {
        throw new Error(
            `<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`,
        );
    }
    const svgStr = __fs.readFileSync(svgPath, 'utf8');

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
