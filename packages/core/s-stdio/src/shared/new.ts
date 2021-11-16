import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPath from '@coffeekraken/sugar/node/is/path';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __STerminalStdio from '../node/terminal/STerminalStdio';
import __SNoUiStdio from './noUi/SNoUiStdio';
import __SStdio, { ISStdioUi } from './SStdio';

/**
 * @name            new
 * @type            Function
 *
 * This static method is a sugar to instanciate an stdio by specifying some sources,
 * and either a path to a SStdio class, an SStdio class directly or a pre-registered
 * stdio id like:
 * - inherit: If is in node context, will fallback to STerminalStdio, if in browser, in SConsoleStdio
 * - terminal: STerminalStdio (node only)
 * - console: SConsoleStdio (browser only)
 * - blessed: SBlessedStdio (node only)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function _new(
    id: string,
    sources,
    stdio?: ISStdioUi,
    settings?: any,
) {
    if (!Array.isArray(sources)) sources = [sources];

    let stdioInstance: any;

    switch (stdio) {
        case __SStdio.UI_TERMINAL:
            if (__isNode()) {
                stdioInstance = new __STerminalStdio(id, sources, settings);
            } else {
                throw new Error(
                    `<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`,
                );
            }
            break;
        case __SStdio.UI_CONSOLE:
            // if (!__isNode())
            //     throw new Error(
            //         `<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`,
            //     );
            // stdioInstance = new __STerminalStdio(id, sources, settings);
            break;
        case __SStdio.NO_UI:
        default:
            stdioInstance = new __SNoUiStdio(id, sources, settings);
            break;
    }

    return stdioInstance;
}
