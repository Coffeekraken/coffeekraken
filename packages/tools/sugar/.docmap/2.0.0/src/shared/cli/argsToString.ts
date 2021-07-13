/**
*
* @name                  argsToString
* @namespace            js.cli
* @type                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
*
* This function take a simple object, a definition object and return you the string version that you can pass
* directly to the command line interface
*
* @param       {Object}        args        The arguments object
* @param       {Object}      [settings={}]               A settings object to configure your command build process
*
* @todo      interface
* @todo      doc
* @todo      tests
* @todo      {Test}      Testing when no definition is passed
*
* @example       js
* import argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
* argsToString({
*    arg1: 'Hello',
*    myOtherArg: 'World'
* });
* // => -a Hello --myOtherArg World
*
* @since       2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/