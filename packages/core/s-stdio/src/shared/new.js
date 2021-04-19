var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/is/class", "@coffeekraken/sugar/shared/is/path", "@coffeekraken/sugar/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const class_1 = __importDefault(require("@coffeekraken/sugar/shared/is/class"));
    const path_1 = __importDefault(require("@coffeekraken/sugar/shared/is/path"));
    const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
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
     * SStdio.new(proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function _new(sources, stdio = 'inherit', settings = {}) {
        if (!Array.isArray(sources))
            sources = [sources];
        let stdioInstance;
        if (class_1.default(stdio)) {
            stdioInstance = new stdio(sources, settings);
        }
        else if (node_1.default() && path_1.default(stdio, true)) {
            // if (!__isNode())
            //   throw new Error(
            //     `<yellow>[SStdio.new]</<yellow> Sorry but to use a path based stdio, you must be in a <magenta>node</magenta> context...`
            //   );
            // @ts-ignore
            let Cls = require(stdio).default; // eslint-disable-line
            Cls = Cls.default || Cls;
            stdioInstance = new Cls(sources, settings);
        }
        else if (typeof stdio === 'string') {
            switch (stdio) {
                case 'inherit':
                    if (node_1.default()) {
                        const __STerminalStdio = require('../node/terminal/STerminalStdio')
                            .default; // eslint-disable-line
                        stdioInstance = new __STerminalStdio(sources, settings);
                    }
                    else {
                        throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                    }
                    break;
                case 'terminal':
                    if (!node_1.default())
                        throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const __STerminalStdio = require('../node/terminal/STerminalStdio')
                        .default; // eslint-disable-line
                    stdioInstance = new __STerminalStdio(sources, settings);
                    break;
                case 'blessed':
                    if (!node_1.default())
                        throw new Error(`<red>[SStdio.new]</<red> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const __SBlessedStdio = require('../node/terminal/SBlessedStdio')
                        .default; // eslint-disable-line
                    stdioInstance = new __SBlessedStdio(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                    break;
                default:
                    break;
            }
        }
        return stdioInstance;
    }
    exports.default = _new;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsZ0ZBQTREO0lBQzVELDhFQUEwRDtJQUMxRCw4RUFBMEQ7SUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQXdCLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBYSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakQsSUFBSSxhQUFrQixDQUFDO1FBRXZCLElBQUksZUFBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLGNBQVEsRUFBRSxJQUFJLGNBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDOUMsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixnSUFBZ0k7WUFDaEksT0FBTztZQUNQLGFBQWE7WUFDYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsc0JBQXNCO1lBQ3hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztZQUN6QixhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2IsS0FBSyxTQUFTO29CQUNaLElBQUksY0FBUSxFQUFFLEVBQUU7d0JBQ2QsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUM7NkJBQ2hFLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjt3QkFDbEMsYUFBYSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUN6RDt5QkFBTTt3QkFDTCxNQUFNLElBQUksS0FBSyxDQUNiLHdHQUF3RyxDQUN6RyxDQUFDO3FCQUNIO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLElBQUksQ0FBQyxjQUFRLEVBQUU7d0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYiw2SUFBNkksQ0FDOUksQ0FBQztvQkFDSixNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQzt5QkFDaEUsT0FBTyxDQUFDLENBQUMsc0JBQXNCO29CQUNsQyxhQUFhLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLElBQUksQ0FBQyxjQUFRLEVBQUU7d0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYiw0SUFBNEksQ0FDN0ksQ0FBQztvQkFDSixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7eUJBQzlELE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtvQkFDbEMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sa0NBQ3RDLFFBQVEsS0FDWCxNQUFNLEVBQUUsSUFBSSxJQUNaLENBQUM7b0JBQ0gsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7U0FDRjtRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUF4REQsdUJBd0RDIn0=