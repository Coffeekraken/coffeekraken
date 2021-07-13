/**
*
* @name            expandPleasantCssClassnamesLive
* @namespace       ks.html
* @type            Function
* @platform        js
* @platform        ts
* @status          beta
*
* This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
* to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
* This function do this live when detecting a new node in the page, etc...
*
* @example         js
* import expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
* expandPleasantCssClassnamesLive();
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/