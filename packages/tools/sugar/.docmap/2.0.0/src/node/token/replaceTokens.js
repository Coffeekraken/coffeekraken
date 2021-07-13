/**
*
* @name            replaceTokens
* @namespace       node.tokens
* @type            Function
* @platform        node
* @platform        ts
* @status          beta
*
* This function take as input a string and replace some tokens using these functions:
* - replacePathTokens: Replace path tokens like %packageRootDir, %distJsDir, etc...
* - replacePackageJsonTokens: Replace tokens like %packageJson.name, %packageJson.version, etc... with package.json values
*
* @param       {String}            string          The string you want to process
* @return      {String}                            The processed string
*
* @example         js
* import replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
* replaceTokens('Hello %packageJson.name, hope you are doing well (%packageRootDir)');
*
* @since           2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/