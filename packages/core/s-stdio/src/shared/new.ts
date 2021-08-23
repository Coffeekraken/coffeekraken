import __isClass from '@coffeekraken/sugar/shared/is/class';
import __isPath from '@coffeekraken/sugar/node/is/path';
import __isNode from '@coffeekraken/sugar/shared/is/node';

/**
 * @name            new
 * @type            Function
 * @async
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
export default async function _new(id: string, sources, stdio: any = 'inherit', settings = {}) {
    if (!Array.isArray(sources)) sources = [sources];

    let stdioInstance: any;

    if (__isClass(stdio)) {
        stdioInstance = new stdio(id, sources, settings);
    } else if (__isNode() && __isPath(stdio, true)) {
        // if (!__isNode())
        //   throw new Error(
        //     `<yellow>[SStdio.new]</<yellow> Sorry but to use a path based stdio, you must be in a <magenta>node</magenta> context...`
        //   );
        // @ts-ignore
        let { default: Cls } = await import(stdio); // eslint-disable-line
        Cls = Cls.default || Cls;
        stdioInstance = new Cls(id, sources, settings);
    } else if (typeof stdio === 'string') {
        switch (stdio) {
            case 'inherit':
                if (__isNode()) {
                    const { default: __STerminalStdio } = await import('../node/terminal/STerminalStdio');
                    stdioInstance = new __STerminalStdio(id, sources, settings);
                } else {
                    throw new Error(
                        `<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`,
                    );
                }
                break;
            case 'terminal':
                if (!__isNode())
                    throw new Error(
                        `<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`,
                    );
                const { default: __STerminalStdio } = await import('../node/terminal/STerminalStdio');
                stdioInstance = new __STerminalStdio(id, sources, settings);
                break;
            // case 'blessed':
            //   if (!__isNode())
            //     throw new Error(
            //       `<red>[SStdio.new]</<red> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`
            //     );
            //   const { default: __SBlessedStdio } = await import('../node/terminal/SBlessedStdio');
            //   stdioInstance = new __SBlessedStdio(sources, {
            //     ...settings,
            //     attach: true
            //   });
            //   break;
            default:
                break;
        }
    }

    return stdioInstance;
}
