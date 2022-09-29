import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SViteTestParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SVite.test method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViteTestParamsInterface extends __SInterface {
    static get _definition() {
        return {
            dir: {
                description:
                    'Specify the directory where to search for tests files',
                type: 'String',
                default: __SSugarConfig.get('vite.test.dir'),
                alias: 'd',
            },
            watch: {
                description: 'Specify if you want to watch to run tests or not',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
        };
    }
}

export default SViteTestParamsInterface;
