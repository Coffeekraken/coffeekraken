/**
*
* @name                                        crop
* @namespace            js.string
* @type                                        Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Allows you to crop a string at a certain length (this length take care of the croping characters like "...")
*
* @param               {String}                  text                      The text to crop
* @param               {Number}                  length                    The text length to have after the croping process
* @param               {Object}                  [settings={}]             An object of settings described bellow:
* - chars (...) {String}: The characters to use to signal the crop
* - splitWords (false) {Boolean}: Specify if you want to split words or not. If not, the function will make sure the final text does not exceeds the wanted length
* @return              {String}                                            The cropped text
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import crop from '@coffeekraken/sugar/js/string/crop';
* crop('Hello World', 10); // => Hello w...
*
* @since       2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/