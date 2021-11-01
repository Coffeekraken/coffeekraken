import {
    ISMarkdownBuilderToken,
    ISMarkdownBuilderTokenExtractResult,
} from '../SMarkdownBuilder';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            ShieldsioHandlebarsHelper
 * @namespace       node.helpers
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISMarkdownBuilderShieldsioHandlebarsHelperSettings {}
export default function ShieldsioHandlebarsHelper(
    settings?: Partial<ISMarkdownBuilderShieldsioHandlebarsHelperSettings>,
): Function {
    const shieldsConfig = __SSugarConfig.get('shieldsio');

    return function (context, options) {
        const shields: string[] = [];

        shieldsConfig.shields.forEach((shield) => {
            shields.push(
                `![${shield}](https://shields.io/${shieldsConfig.urls[shield]})`,
            );
        });

        return shields.join(' ');
    };
}
