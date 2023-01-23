// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';

/**
 * @name                redirectHandler
 * @namespace           sugar.node.server.frontend.modules.redirect
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the  pages
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
export default function redirectHandler({ req, res }) {
    return new Promise(async (resolve) => {
        const bench = new __SBench('handlers.redirect');
        res.redirect(req.redirect);
        resolve(req.redirect);
        bench.end();
    });
}
