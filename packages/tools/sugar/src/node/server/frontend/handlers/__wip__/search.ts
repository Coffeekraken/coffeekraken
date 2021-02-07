// @ts-nocheck

import __sugarConfig from '../../../config/sugar';
import __fs from 'fs';
import __marked from 'marked';
import __filter from '../../../object/filter';
import { JSDOM as __jsDom } from 'jsdom';

/**
 * @name                search
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "search" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function search(req, server) {
  return new Promise(async ({ resolve, reject }) => {
    let title = `Search results | 18 results`;

    let keyword = req.params[0] ? req.params[0].split(' ')[0] : 'doc';
    let searchString = req.params[0] ? req.params[0].replace(keyword, '') : '';

    const searchRules = __sugarConfig(
      'frontend.handlers.search.settings.rules'
    );

    // preparing the handlers to use for the research
    let handlers = __filter(searchRules, (rule) => {
      if (rule.keyword && rule.keyword === keyword) return true;
      return false;
    });

    // loop on each handlers to proceed to the search
    let resultsArray = [];
    for (let key in handlers) {
      const handler = handlers[key];
      const results = await handler.handler(searchString, handler.settings);
      resultsArray = [...resultsArray, ...results];
    }

    // pass all the results info JSON format
    resultsArray = resultsArray.map((item) => {
      return item.toJson();
    });

    // send back the result
    resolve({
      view: 'components.search',
      title,
      content: resultsArray,
      type: 'application/json'
    });
  });
}
export = search;
