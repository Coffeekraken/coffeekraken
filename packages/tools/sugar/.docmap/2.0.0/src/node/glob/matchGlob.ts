/**
*
* @name            matchGlob
* @namespace       node.glob
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function take as input a file path and a glob pattern that can be an extended one (this mean that is support the listed features above).
* Then it check if the passed filepath match the passed glob pattern or not and return true or false depending on the result.
*
* @feature         Support extended glob syntax like "something/**{1,4}/*"
* @feature         Support content regex syntax like "something/*:/.+namespace.+/gm"
*
* @param       {String}        input            The file path to check
* @param       {String|String[]}        glob                The glob pattern to check
* @return      {Boolean}               true if match, false if not
*
* @example         js
* import matchGlob from '@coffeekraken/sugar/node/glob/matchGlob';
* matchGlob('/something/cool.txt', '*\/cool.txt'); // => true
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/