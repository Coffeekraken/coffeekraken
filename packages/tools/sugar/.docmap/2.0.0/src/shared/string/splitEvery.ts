/**
*
* @name                          splitEvery
* @namespace            js.string
* @type                          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
*
* @param               {String}                  text                      The text to split
* @param               {Number}                  every                     How many characters to split the text
* @param               {Boolean}                 [splitWords=false]        If you want to split the words or not...
* @return              {Array}                                             An array of the splited text parts
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import splitEvery from '@coffeekraken/node/string/splitEvery';
* splitEvery('Hello World', 2, true); // => ['He','ll','o ','Wo','rl','d']
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/