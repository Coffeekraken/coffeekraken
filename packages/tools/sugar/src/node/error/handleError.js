"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const childProcess_1 = __importDefault(require("../is/childProcess"));
const hotkey_1 = __importDefault(require("../keyboard/hotkey"));
const toString_1 = __importDefault(require("../string/toString"));
const parse_1 = __importDefault(require("../string/parse"));
const blessed_1 = __importDefault(require("blessed"));
const color_1 = __importDefault(require("../color/color"));
/**
 * @name                    handleError
 * @namespace               sugar.node.error
 * @type                    Function
 * @wip
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
const errorPanels = [];
function handleError() {
    if (process.env.NODE_ENV === 'test')
        return;
    if (childProcess_1.default()) {
        process.on('uncaughtException', __handleChildProcessErrors);
        process.on('unhandledRejection', __handleChildProcessErrors);
    }
    else {
        process.on('uncaughtException', __handleMainProcessErrors);
        process.on('unhandledRejection', __handleMainProcessErrors);
        hotkey_1.default('escape', {}).on('press', () => {
            if (!errorPanels.length)
                return;
            const $panel = errorPanels.pop();
            $panel.destroy();
        });
    }
}
function createErrorPanel(error) {
    if (!global.screen)
        return;
    const $bg = blessed_1.default.box({
        width: '100%-10',
        height: '100%-6',
        top: 3,
        left: 5,
        style: {
            bg: color_1.default('terminal.red').toString()
        },
        padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
        }
    });
    const $box = blessed_1.default.box({
        width: '100%-4',
        height: '100%-2',
        top: 0,
        left: 0,
        style: {
            fg: 'white',
            bg: color_1.default('terminal.black').toString(),
            scrollbar: {
                bg: color_1.default('terminal.primary').toString()
            }
        },
        scrollable: true,
        scrollbar: {
            ch: ' ',
            inverse: true
        },
        padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
        },
        content: toString_1.default(error)
    });
    $bg.append($box);
    global.screen.append($bg);
    errorPanels.push($bg);
    $bg.focus();
}
function __handleChildProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    // // error = error.toString();
    if (!error)
        return;
    const errorStringArray = [error.stack];
    // __SIpc.trigger('error', errorStringArray.join('\n'));
    console.log(errorStringArray.join('\n'));
    // console.log(__toString(error));
    // process.exit(1);
}
function __handleMainProcessErrors(error) {
    // @TODO     find a better solution to avoid blessed issues
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (!global.screen) {
        throw error;
    }
    if (error instanceof Buffer) {
        error = error.toString();
    }
    if (typeof error === 'string') {
        const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
        const stringErrorMatches = error.match(stringErrorReg);
        console.log(error);
        if (stringErrorMatches) {
            const errorString = parse_1.default(stringErrorMatches[0]
                .replace(/\s?message:\s?/, '')
                .replace(/\s?name:\s?/, '')
                .trim()
                .replace(/,$/, ''));
            createErrorPanel(errorString);
            return;
        }
    }
    else if (typeof error === 'object' && error.name && error.message) {
        createErrorPanel(`${error.name}

    ${error.message}

    ${error.stack}
    `);
        return;
    }
    else {
        createErrorPanel(toString_1.default(error));
        return;
    }
}
module.exports = handleError;
//# sourceMappingURL=module.js.map