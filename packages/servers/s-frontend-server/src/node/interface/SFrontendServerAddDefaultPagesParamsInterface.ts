// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontendServerAddDefaultPagesParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server adding default pages process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerAddDefaultPagesParamsIn extends __SInterface {
    static get _definition() {
        return {
            yes: {
                description: 'Answer yes to all the potential questions',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.pagesDir'),
            },
        };
    }
}
