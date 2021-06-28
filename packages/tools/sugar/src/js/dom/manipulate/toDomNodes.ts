// @ts-nocheck

import __strToHtml from '../../shared/string/strToHtml';

function processString(string) {
  return string
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&nbsp;/g, ' ');
}

function processNodeElm(elm) {
  // check tpl type
  switch (elm.tagName.toLowerCase()) {
    case 'script':
      // grab the script content and convert it to html if needed
      return __strToHtml(elm.innerHTML);
      break;
    case 'template':
      // get the template content
      return document.importNode(elm.content, true);
      break;
    default:
      return elm;
      break;
  }
}

/**
 * @name      toDomNodes
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        betas
 *
 * Return a usable nodeTree from a variable source like selector, an html string, an html template tag or a node that will be cloned.
 *
 * @param 			{String|HTMLElement} 			source 			The source of the template (html string, selector, node element)
 * @return 			{HTMLElement} 									An HTMLElement node tree that represent the template
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import toDomNodes from '@coffeekraken/sugar/js/dom/toDomNodes';
 * toDomNodes('<span>Hello World</span>');
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toDomNodes(source: string | HTMLElement): HTMLElement {
  // if the source is an HTMLElement
  if (source.tagName) {
    return processNodeElm(source);
  }

  if (typeof source === 'string') source = source.trim();

  // check source type
  if (
    typeof source === 'string' &&
    source.substr(0, 1) === '<' &&
    source.substr(-1) === '>'
  ) {
    // The source is an html string source
    return __strToHtml(source);
  }

  // string selector
  if (typeof source === 'string') {
    // Try to get the template from the document
    const tpl = document.querySelector(source);
    // if don't found anything
    if (!tpl) return;
    // process the node
    return processNodeElm(tpl);
  }
}
export default toDomNodes;
