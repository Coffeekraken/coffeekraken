/**
*
* @name            expandPleasantCssClassnames
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
* @param     {String}          html          The HTML to process. It can be actually any string values like .vue file, etc...
* @return    {String}                      The processed string with converted classnames
*
* @example         js
* import expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
* expandPleasantCssClassnames('...');
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/