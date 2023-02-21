// @ts-nocheck

import __SDocmap from '@coffeekraken/s-docmap';

/**
 * @name                docmap
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the docmap url
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
export default async function docmap(req, res, settings = {}) {
    return new Promise(async (resolve) => {
        const docmap = new __SDocmap();

        const json = await docmap.read({
            snapshot: req.query.v,
        });

        const finalJson = {
            ...json,
            map: {},
        };

        Object.keys(json.map).forEach((key) => {
            const obj = json.map[key];
            if (!obj.platform) return;
            if (!obj.status) return;
            // if (['stable', 'beta', 'alpha'].indexOf(obj.status) === -1) return;
            finalJson.map[key] = obj;
        });

        res.status(200);
        res.type('application/json');
        res.send(finalJson);
        resolve(finalJson);
    });
}
