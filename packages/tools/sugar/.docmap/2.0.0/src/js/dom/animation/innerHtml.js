/**
*
* @name            innerHtml
* @namespace            js.dom.animation
* @type            Function
* @platform          js
* @platform          ts
* @status          beta
*
* Change the content of a Node with the possibility to animate the change using one of these animations:
* - fade
* - fadeUp
* - fadeDown
* - fadeLeft
* - fadeRight
* You can also choose between 3 actions which are: replace, append and prepend
*
* @param           {HTMLElement}            node           The node to change to content of
* @param           {String}                 content        The new content of the node
* @param           {Object}                 [settings={}]  The settings to change the content like 'animIn', 'animOut', and more...
* @return          {Promise}                               A promise resolved when the change has been made
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
* innerHtml(myCoolNode, 'Hello World', {
*    action: 'replace', // replace, append, prepend
*    animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
*    animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
*    animInDuration: 600, // in ms if number, otherwise a string like '1s', '1m', etc...
*    animOutDuration: 300, // in ms if number, otherwise a string like '1s', '1m', etc...
*    animInDistance: 25, // in px
*    animOutDistance: 25, // in px
*    animInEasing: 'ease-in-out',
*    animOutEasing: 'ease-in-out'
* }).then(() => {
*    // do something when the change has been made...
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/