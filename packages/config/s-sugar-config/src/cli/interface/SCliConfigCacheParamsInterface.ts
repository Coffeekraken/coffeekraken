// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SCliConfigCacheParamsInterface
 * @namespace           node.mono.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar config.cache` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliConfigCacheParamsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify the config id you want to cache',
                type: 'string',
                default: 'default',
            },
            cacheDir: {
                description:
                    'Specify the cache directory where to store the configs',
                type: 'string',
                default: __SSugarConfig.get('config.cacheDir'),
            },
        };
    }
}
