import __callsites from 'callsites';
import __esm from 'esm';
import { createRequire } from 'module';
import __isCjs from '../../shared/module/isCjs';

/**
 * @name                require
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to get back an fully functional "require" function in
 * an ESM context.
 *
 * @param       {String}            package         The package you want to require
 * @return      {Function}                  The "require" cjs fully functional function
 *
 * @example         js
 * import require from '@coffeekraken/sugar/node/esm/require';
 * require('something');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function _require(pkg: string) {
    if (__isCjs()) {
        console.log('DOLKSPDOKJSOPDJ');
    }

    // @ts-ignore
    let filePath = __callsites()[1]
        .getFileName()
        ?.replace(/^file:\/\//, '');
    const rr = createRequire(<string>filePath);
    const r = __esm({});
    const requiredPkg = rr(pkg);
    return requiredPkg;
}
