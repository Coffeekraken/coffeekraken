/**
 * @name            injectStyle
 * @namespace       sugar.js.css
 * @type            Function
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @example       js
 * import injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function injectStyle(style, node = document.head) {
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.innerHTML = style;
  node.appendChild($tag);
  return $tag;
}
