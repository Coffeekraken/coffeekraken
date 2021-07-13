/**
*
* @name            resolveGlob
* @namespace            node.glob
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function simply resolve the passed glob pattern(s) and resolve his promise
* with an Array of SFile instances to work with
*
* @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
* @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
* @return      {SFile[]|String[]}                                  An array of SFile instances or an array of string if is a folder
*
* @todo      interface
* @todo      doc
* @todo      tests
* @todo          document the special ":" syntax available
*
* @example         js
* import resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
* resolveGlob('/my/cool/pattern/*.js');
*
* @see         https://www.npmjs.com/package/glob
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/