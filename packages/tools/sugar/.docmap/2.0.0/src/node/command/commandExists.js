/**
*
* @name            commandExists
* @namespace       node.command
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to check if a command exists on the system where the script is running
*
* @todo        tests           high
* @todo        Documentation
*
* @param       {String}            command         The command to check like "ls", "node", etc...
* @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
*
* @example         js
* import commandExists from '@coffeekraken/sugar/node/command/commandExists';
* await commandExists('ls'); // => true
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/