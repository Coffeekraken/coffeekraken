import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            config
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a sugar configuration
 *
 * @param       {String}        dotPath            The config dotpath
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function config(dotPath: string): string {
    return __SSugarConfig.get(dotPath);
}
