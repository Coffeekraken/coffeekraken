/**
*
* @name                    handleError
* @namespace            node.error
* @type                    Function
* @platform        ts
* @platform        node
* @status          wip
*
* This function take a thrown error and try to display it the best way possible.
* Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
* pass this function as the handler one and that's it...
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import handleError from '@coffeekraken/sugar/node/error/handleError';
* process.on('uncaughtException', handleError);
* process.on('unhandledRejection', handleError);
*
* @since         2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/