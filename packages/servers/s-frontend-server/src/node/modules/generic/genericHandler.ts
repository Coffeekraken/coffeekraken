// @ts-nocheck

import __pageType from './types/page';
import __viewsType from './types/views';

/**
 * @name                genericHandler
 * @namespace           node.modules.docmap
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function genericHandler(api) {
    switch (api.pageConfig.type) {
        case 'page':
            return __pageType(api);
            break;
        case 'views':
        default:
            return __viewsType(api);
            break;
    }
}
