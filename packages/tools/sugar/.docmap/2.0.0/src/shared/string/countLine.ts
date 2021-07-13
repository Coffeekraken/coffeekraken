/**
*
* @name                                  countLine
* @namespace            js.string
* @type                                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Count how many characters their is in the passed line.
* This function will exclude the characters like the html tags like <red>, etc...
*
* @param           {String}              line              The line to count
* @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
* - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
* - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
* - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
* @return          {Number}                                How many characters their is in the line
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import countLine from '@coffeekraken/sugar/js/string/countLine';
* countLine('Hello <red>World</red>'); // 11
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/