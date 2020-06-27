"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHtmlClassFromTagName;

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            getHtmlClassFromTagName
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @example       js
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 *
 */
function getHtmlClassFromTagName(tagName) {
  if (!tagName) return HTMLElement;
  const tagNameUpperFirst = (0, _upperFirst.default)(tagName);
  if (window[`HTML${tagNameUpperFirst}Element`]) return window[`HTML${tagNameUpperFirst}Element`];
  if (tagName === 'a') return HTMLAnchorElement;
  if (tagName === 'audio') return HTMLAudioElement;
  if (tagName === 'body') return HTMLBodyElement;
  if (tagName === 'button') return HTMLButtonElement;
  if (tagName === 'canvas') return HTMLCanvasElement;
  if (tagName === 'dl') return HTMLDListElement;
  if (tagName === 'data') return HTMLDataElement;
  if (tagName === 'datalist') return HTMLDataListElement;
  if (tagName === 'details') return HTMLDetailsElement;
  if (tagName === 'dialog') return HTMLDialogElement;
  if (tagName === 'dir') return HTMLDirectoryElement;
  if (tagName === 'div') return HTMLDivElement;
  if (tagName === 'html') return HTMLDocument;
  if (tagName === 'embed') return HTMLEmbedElement;
  if (tagName === 'fieldset') return HTMLFieldSetElement;
  if (tagName === 'font') return HTMLFontElement;
  if (tagName === 'form') return HTMLFormElement;
  if (tagName === 'frame') return HTMLFrameElement;
  if (tagName === 'head') return HTMLHeadElement;
  if (tagName === 'html') return HTMLHtmlElement;
  if (tagName === 'iframe') return HTMLIFrameElement;
  if (tagName === 'img') return HTMLImageElement;
  if (tagName === 'input') return HTMLInputElement;
  if (tagName === 'label') return HTMLLabelElement;
  if (tagName === 'legend') return HTMLLegendElement;
  if (tagName === 'link') return HTMLLinkElement;
  if (tagName === 'map') return HTMLMapElement;
  if (tagName === 'marquee') return HTMLMarqueeElement;
  if (tagName === 'media') return HTMLMediaElement;
  if (tagName === 'menu') return HTMLMenuElement;
  if (tagName === 'meta') return HTMLMetaElement;
  if (tagName === 'meter') return HTMLMeterElement;
  if (tagName === 'del') return HTMLModElement;
  if (tagName === 'ins') return HTMLModElement;
  if (tagName === 'dol') return HTMLOListElement;
  if (tagName === 'object') return HTMLObjectElement;
  if (tagName === 'optgroup') return HTMLOptGroupElement;
  if (tagName === 'option') return HTMLOptionElement;
  if (tagName === 'output') return HTMLOutputElement;
  if (tagName === 'p') return HTMLParagraphElement;
  if (tagName === 'param') return HTMLParamElement;
  if (tagName === 'picture') return HTMLPictureElement;
  if (tagName === 'pre') return HTMLPreElement;
  if (tagName === 'progress') return HTMLProgressElement;
  if (tagName === 'quote') return HTMLQuoteElement;
  if (tagName === 'script') return HTMLScriptElement;
  if (tagName === 'select') return HTMLSelectElement;
  if (tagName === 'slot') return HTMLSlotElement;
  if (tagName === 'source') return HTMLSourceElement;
  if (tagName === 'span') return HTMLSpanElement;
  if (tagName === 'style') return HTMLStyleElement;
  if (tagName === 'td') return HTMLTableCellElement;
  if (tagName === 'th') return HTMLTableHeaderCellElement;
  if (tagName === 'col') return HTMLTableColElement;
  if (tagName === 'colgroup') return HTMLTableColElement;
  if (tagName === 'table') return HTMLTableElement;
  if (tagName === 'tr') return HTMLTableRowElement;
  if (tagName === 'tfoot') return HTMLTableSectionElement;
  if (tagName === 'thead') return HTMLTableSectionElement;
  if (tagName === 'tbody') return HTMLTableSectionElement;
  if (tagName === 'template') return HTMLTemplateElement;
  if (tagName === 'textarea') return HTMLTextAreaElement;
  if (tagName === 'time') return HTMLTimeElement;
  if (tagName === 'title') return HTMLTitleElement;
  if (tagName === 'track') return HTMLTrackElement;
  if (tagName === 'ul') return HTMLUListElement;
  if (tagName === 'video') return HTMLVideoElement;
  if (tagName === 'area') return HTMLAreaElement;
  return HTMLElement;
}

module.exports = exports.default;