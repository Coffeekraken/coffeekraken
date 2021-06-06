// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '@coffeekraken/s-docmap';

/**
 * @name                docMap
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the docMap url
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function docMap(req, res, settings = {}) {
    return new __SPromise(async ({resolve, reject, pipe}) => {
        const docMap = new __SDocMap();

        const json = await docMap.read();

        res.status(200);
        res.type('application/json');
        res.send(json);
        resolve(json);
    });
}
