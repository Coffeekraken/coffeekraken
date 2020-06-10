const __sugarConfig = require('../../../config/sugar');
const __fs = require('fs');
const __marked = require('marked');
const __jsDom = require('jsdom').JSDOM;

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "doc" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function doc(req, server) {
  return new Promise((resolve, reject) => {
    // get the path
    const docPath = __sugarConfig('doc.rootDir');
    const filePath = `${docPath}/${req.params[0]}.md`;
    let title = __sugarConfig('frontend.pages.doc.title');

    // try to read the doc file
    // if (!__fs.existsSync(filePath)) return reject('404');

    // read the file
    const mdData = __fs.readFileSync(filePath, 'utf8');

    // convert to html
    const htmlData = __marked(mdData);

    const $dom = new __jsDom(htmlData);
    title = title.replace(
      '[title]',
      $dom.window.document.querySelector('h1').textContent || ''
    );

    // send back the result
    resolve({
      title,
      content: htmlData
    });
  });
};
