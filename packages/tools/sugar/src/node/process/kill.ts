import __fkill from 'fkill';

/**
 * @name            kill
 * @namespace       node.process
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function allows you to kill a process by id or by port.
 * This is just a proxy to the awesome fkill package
 *
 * @param       {number|string}            portOrId        The port or the id of the process you want to kill. If you want to kill from a port, prefix your port with ":" like so ":8888"
 * @return      {Promise}                           A promise resolved if the process has been killed, rejected if not
 *
 * @snippet         __kill($1)
 * 
 * @example         js
 * import { __kill } from '@coffeekraken/sugar/process';
 * await __kill(':8888'); // port
 * await __kill(8765); // id
 *
 * @see             https://www.npmjs.com/package/fkill
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function __kill(portOrId: number | string): Promise<any> {
    return __fkill(portOrId);
}
