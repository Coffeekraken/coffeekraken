/**
*
* @name            injectStyle
* @namespace            js.css
* @type            Function
* @platform          js
* @platform          ts
* @status              beta
*
* Inject a passed style string in the DOM
*
* @param         {String}          style         The style to inject in DOM
* @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
* @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
*
* @todo        interface
* @todo        doc
*
* @example       js
* import injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
* injectStyle('a { color: red; }');
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/