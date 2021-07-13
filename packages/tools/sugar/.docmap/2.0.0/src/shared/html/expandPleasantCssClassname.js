/**
*
* @name            expandPleasantCssClassname
* @namespace       shared.html
* @type            Function
* @platform        js
* @platform        node
* @platform        ts
* @status          beta
*
* This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
* to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
*
* @param     {String}          classesStr          The classes string to convert like "s-typo:h1 s-font:40", etc...
* @return    {String}                      The processed string with converted classnames
*
* @example         js
* import expandPleasantCssClassname from '@coffeekraken/sugar/shared/html/expandPleasantCssClassname';
* expandPleasantCssClassname('...');
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/