/**
*
* @name                extractNoneGlob
* @namespace            js.glob
* @type                Function
* @platform          js
* @platform          ts
* @platform          node
* @status            beta
*
* This function simply return you the none glob part of a passed string
*
* @param       {String}            string          The string from which to extract the none glob part
* @return      {String}                            The none glob part of the passed string
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import extractNoneGlob from '@coffeekraken/sugar/js/glob/extractNoneGlob';
* extractNoneGlob('/coco/hello/*.js'); // => '*.js'
*
* @see             https://www.npmjs.com/package/glob-parent
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/