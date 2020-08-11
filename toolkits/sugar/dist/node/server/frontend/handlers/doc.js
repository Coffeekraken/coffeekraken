"use strict";

var __sugarConfig = require('../../../config/sugar');

var __fs = require('fs');

var __marked = require('marked');

var __jsDom = require('jsdom').JSDOM;
/**
 * @name                doc
 * @namespace           node.server.frontend.handlers
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
    var docPath = __sugarConfig('doc.rootDir');

    var filePath = "".concat(docPath, "/").concat(req.params[0], ".md");

    var title = __sugarConfig('frontend.pages.doc.title'); // try to read the doc file
    // if (!__fs.existsSync(filePath)) return reject('404');
    // read the file


    var mdData = __fs.readFileSync(filePath, 'utf8'); // convert to html


    var htmlData = __marked(mdData);

    var $dom = new __jsDom(htmlData);
    title = title.replace('[title]', $dom.window.document.querySelector('h1').textContent || ''); // let content = `
    //     <my-component param1="hello world"></my-component>
    //   `;
    // send back the result

    resolve({
      view: 'pages.doc',
      title,
      content: "<div class=\"marked\">".concat(htmlData, "</div>") // content

    });
  });
};