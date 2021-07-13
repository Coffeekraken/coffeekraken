/**
*
* @name            replacePackageJsonTokens
* @namespace            node.path
* @type            Function
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to replace packageJson tokens like %packageJson.name, etc... with
* real package.json values
*
* @param       {String}                 string             The string you want to process
* @param       {IReplacePackageJsonTokensSettings}            [settings={}]       Some settings to configure your tokens replacements
* @return      {String}                                        The resulting string
*
* @example         js
* import replacePackageJsonTokens from '@coffeekraken/sugar/node/path/replacePackageJsonTokens';
* replacePackageJsonTokens('Hello %packageJson.name'); // => Hello @coffeekraken/sugar
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/