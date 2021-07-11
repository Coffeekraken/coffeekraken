import { createRequire } from 'module';
import caller from 'caller-callsite';
import __callsites from 'callsites';
import __esm from 'esm';

/**
 * @name                require
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @platform            ts
 * @status              beta
 * 
 * This function allows you to get back an fully functional "require" function in
 * an ESM context.
 * 
 * @return      {Function}                  The "require" cjs fully functional function
 * 
 * @example         js
 * import require from '@coffeekraken/sugar/node/esm/require';
 * require('something');
 * 
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function require() {
    const rr = createRequire(__callsites()[1].getFileName());
    const r = __esm({});
    return rr;
}