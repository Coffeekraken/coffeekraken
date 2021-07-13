/**
*
* @name                            replaceTags
* @namespace            js.html
* @type                            Function
* @platform          js
* @platform          ts
* @platform          node
* @status            beta
*
* Replace all the html tags that you specify by something else that you can fully choose
*
* @param               {String}                 text                           The text in which replace all the tags
* @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
* @return              {String}                                                The new text
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example             js
* import replaceTags from '@coffeekraken/sugar/js/html/replaceTags';
* replaceTags('<span>Hello</span> world', {
*    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
* });
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/