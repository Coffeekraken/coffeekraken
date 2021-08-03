// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __flatten from '@coffeekraken/sugar/shared/object/flatten';

/**
 * @name                config
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the config url
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
export default async function config(req, res, settings = {}) {
    return new __SPromise(async ({resolve, reject, pipe}) => {
        
        let config = __SSugarConfig.get('.');

        if (req.query?.flat !== undefined) {
            config = __flatten(config);
        }

        res.status(200);
        res.type('application/json');
        res.send(config);
        resolve(config);
    });
}
