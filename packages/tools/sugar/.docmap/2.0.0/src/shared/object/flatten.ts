/**
*
* @name                              flatten
* @namespace            js.object
* @type                              Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Transform the passed multiple level object into a single level one
*
* @param               {Object}                          object                    The object to flatten
* @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
* @return              {Object}                                                    The flatten object
*
* @setting               {String}            [separation="."]          The separation character to use for preperty names
* @setting 							{Boolean}			    	[array=false] 		Specify if you want to flatten array or not
* @setting               {Boolean}          [quoteSeparatedProperties=true]      Specify if you want to quote dotted properties to be able to restore them correctly later
* @setting               {String}        [quoteCharacter='"']        Specify the quote character to use when need to quote separated properties
* @setting               {Boolean}       [keepLastIntact=false]       Specify if you want to keep the last level (object, array) intact and not to flatten each properties
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example             js
* import flatten from '@coffeekraken/sugar/js/object/flatten';
* flatten({
*    hello: {
*      world: 'Coco'
*    }
* });
*
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/