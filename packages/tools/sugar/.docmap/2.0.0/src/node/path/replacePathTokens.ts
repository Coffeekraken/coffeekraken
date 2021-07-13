/**
*
* @name            replacePathTokens
* @namespace            node.path
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function take as parameter either a path string, or an array of paths
* and return the according value type with the tokens (%tmpDir, %packageCacheDir, etc...) replaced
*
* @param       {String|Array<String>}          paths           The path(s) you want to process
* @param       {IReplacePathTokensSettings}            [settings={}]       Some settings to configure your tokens replacements
* @return      {String|Array<String>}                          If passed a string, get back a string, if passed an array, get back an array
*
* @example         js
* import replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
* replacePathTokens('%packageCacheDir/something.txt'); // => /path/to/cache/directory/something.txt'
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/