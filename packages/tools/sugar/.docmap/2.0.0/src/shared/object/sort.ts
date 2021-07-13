/**
*
* @name                                sort
* @namespace            js.object
* @type                                Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Sort an object properties the same way as the Array.sort do it
*
* @param                 {Object}                  object                The object to sort
* @param                 {Function}                sort                  The sort function to use
* @return                {Object}                                        The sorted object
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example               js
* import sortObject from '@coffeekraken/sugar/js/object/sort';
* sortObject({
*    coco: { weight: 10 },
*    lolo: { weight: 2 },
*    plop: { weight: 5 }
* }, (a, b) => {
*   return a.weight - b.weight;
* });
* // {
* //   lolo: { weight: 2 },
* //   plop: { weight: 5 },
* //   coco: { weight: 10 }
* // }
*
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/