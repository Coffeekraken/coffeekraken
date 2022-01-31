// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SSitemapBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSitemapBuilderBuildParams {
    source: string[];
    sourcesSettings: any;
    output: string;
    save: boolean;
}

export default class SSitemapBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            source: {
                description:
                    'Specify the source(s) you want to build your sitemap. Can be all the configured sources specified under the "config.sitemap.sources" config',
                type: 'Array<String>',
                default: [],
            },
            sourcesSettings: {
                description:
                    'Specigy sources settings by passing an object under each source "id" property',
                type: 'Object',
                default: {},
            },
            output: {
                description: 'Specify where to save the sitemap in xml format',
                type: 'String',
                default: __SSugarConfig.get('sitemapBuilder.build.output'),
            },
            save: {
                description: 'Specify if you want to save the sitemap or not',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
