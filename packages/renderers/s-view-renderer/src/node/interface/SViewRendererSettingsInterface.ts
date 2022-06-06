import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SViewRendererSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SViewRenderer settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SViewRendererSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            rootDirs: {
                description:
                    'Specify some folder paths where to search for views',
                type: 'String',
                default: __SSugarConfig.get('viewRenderer.rootDirs'),
            },
            cacheDir: {
                description: 'Specigy the folder to store the engines cache',
                type: 'String',
                default: __SSugarConfig.get('viewRenderer.cacheDir'),
            },
            enginesSettings: {
                description:
                    'Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"',
                type: 'Object',
                default: {},
            },
            defaultData: {
                description: 'Specify some default data to pass to the view',
                type: 'Object',
                default: {},
            },
            sharedDataFiles: {
                description: 'Specify some shared data files to load',
                type: 'String[]',
                default: __SSugarConfig.get('viewRenderer.sharedDataFiles'),
            },
        };
    }
}
