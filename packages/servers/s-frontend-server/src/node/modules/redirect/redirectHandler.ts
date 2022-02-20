// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __marked from 'marked';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function redirectHandler(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
        __SBench.start('handlers.redirect');        
        res.redirect(req.redirect);
        resolve(req.redirect);
        __SBench.end('handlers.redirect', {}).log();
    });
}
