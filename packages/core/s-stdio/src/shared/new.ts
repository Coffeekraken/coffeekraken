import { __isNode } from '@coffeekraken/sugar/is';
import type { ISStdioSettings } from './SStdio.js';
import __SStdio from './SStdio.js';
import type { ISStdioAdapter } from './SStdioAdapter.js';
import type { ISStdioSource } from './SStdioSource.js';

/**
 * @___name            new
 * @___type            Function
 *
 * This static method is a sugar to instanciate an stdio by specifying some sources,
 * and either a path to a SStdio class, an SStdio class directly or a pre-registered
 * stdio id like:
 * - inherit: If is in node context, will fallback to SBasicStdio, if in browser, in SConsoleStdio
 *
 * @___param       {String}        id          A unique id for your stdio instance
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
 * import { __spawn } from '@coffeekraken/sugar/process';
 * const proc = __spawn('ls -la');
 * await SStdio.new('default', proc);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function _new(
    id: string,
    sources: ISStdioSource[],
    adapters: ISStdioAdapter[],
    settings?: ISStdioSettings,
) {
    if (!Array.isArray(sources)) sources = [sources];

    let stdioInstance: any;

    if (__isNode()) {
        stdioInstance = new __SStdio(id, sources, adapters, settings);
    } else {
        throw new Error(
            `No stdio implementation found for the current "browser" environment...`,
        );
    }
    return stdioInstance;
}
