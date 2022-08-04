import __isNode from '@coffeekraken/sugar/shared/is/node';
import __SBasicStdio from '../node/basic/SBasicStdio';
import type { ISStdioUi } from './SStdio';
import __SStdio from './SStdio';

/**
 * @name            new
 * @type            Function
 *
 * This static method is a sugar to instanciate an stdio by specifying some sources,
 * and either a path to a SStdio class, an SStdio class directly or a pre-registered
 * stdio id like:
 * - inherit: If is in node context, will fallback to SBasicStdio, if in browser, in SConsoleStdio
 *
 * @param       {String}        id          A unique id for your stdio instance
 * @param         {SProcess}          proc        The process to display Stdio for
 * @param           {ISStdioUi}         stdio           Specify the stdio to init
 * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/s-stdio';
 * import spawn from '@coffeekraken/sugar/node/process/spawn';
 * const proc = spawn('ls -la');
 * await SStdio.new('default', proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function _new(
    id: string,
    sources,
    stdio?: ISStdioUi,
    settings?: any,
) {
    if (!Array.isArray(sources)) sources = [sources];

    let stdioInstance: any;

    if (__isNode()) {
        switch (stdio) {
            case __SStdio.UI_BASIC:
            default:
                stdioInstance = new __SBasicStdio(id, sources, settings);
                break;
        }
    } else {
        throw new Error(
            `No stdio implementation found for the current "browser" environment...`,
        );
    }
    return stdioInstance;
}
