// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSitemapBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the SSitemapBuilder settings
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSitemapBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            sources: {
                description:
                    'Specify the sources to use to build the sitemap. A source is a objet with the properties "active", "settings" and "path"',
                type: 'Object',
                default: {},
            },
        };
    }
}
