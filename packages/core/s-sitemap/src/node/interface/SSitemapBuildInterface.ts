// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSitemapBuildInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSitemapBuildParams {}

export default class SSitemapBuildParamsInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                source: {
                    type: 'Array<String>',
                    default: [],
                },
                sourcesSettings: {
                    type: 'Object',
                    default: {},
                },
            })
        );
    }
}
