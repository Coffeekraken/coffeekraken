"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("./SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../terminal/parseHtml"));
const color_1 = __importDefault(require("../color/color"));
const ora_1 = __importDefault(require("ora"));
const countLine_1 = __importDefault(require("../string/countLine"));
module.exports = class SBlessedFooter extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            authors: [],
            website: null,
            blessed: {
                width: '100%',
                height: 10,
                position: {
                    top: '100%-1',
                    left: 0
                },
                style: {
                    bg: color_1.default('terminal.primary').toString(),
                    fg: color_1.default('terminal.black').toString()
                },
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 1,
                    right: 0
                }
            }
        }, settings));
        if (this._settings.authors.length) {
            const authArray = [];
            this._settings.authors.forEach((auth) => {
                authArray.push(auth.name);
            });
            let content = parseHtml_1.default(` Made by <bold>${authArray.join(', ')}</bold>`);
            this._authorsBox = blessed_1.default.box({
                top: 0,
                right: 0,
                height: 1,
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                style: {
                    bg: 'black',
                    fg: 'white'
                }
            });
            this._authorsBox.setContent(content);
            this.append(this._authorsBox);
        }
        this._copyrightBox = blessed_1.default.text({
            left: 0,
            style: {
                bg: this._settings.style.bg,
                fg: this._settings.style.fg
            },
            content: parseHtml_1.default(`MIT ©${new Date().getFullYear()} Coffeekraken`)
        });
        this.append(this._copyrightBox);
        this._commandsStatusBox = blessed_1.default.text({
            position: {
                right: countLine_1.default(this._authorsBox.getContent())
            },
            style: {
                bg: this._settings.style.bg,
                fg: this._settings.style.fg,
                bg: 'red'
            },
            tags: true
        });
        this.append(this._commandsStatusBox);
        // setTimeout(this.update.bind(this));
        // setInterval(this._updateStatusBar.bind(this), 100);
    }
    /**
     * @name            _updateStatusBar
     * @type            Function
     * @private
     *
     * This method simply update the status bar with the commands statuses
     *
     * @since         2.0.0
     *
     */
    _updateStatusBar() {
        let commandsStatusTextArray = [];
        for (let key in this._settings.commands) {
            const commandInstance = this._settings.commands[key];
            if (!commandInstance._footerSpinner) {
                commandInstance._footerSpinner = ora_1.default(commandInstance.name);
            }
            if (commandInstance.state === 'running') {
                commandInstance._footerSpinner.color = 'black';
                commandsStatusTextArray.push(`{${color_1.default('terminal.cyan').toString()}-bg} ${commandInstance._footerSpinner.frame()} (${commandInstance.key}) {/${color_1.default('terminal.cyan').toString()}-bg}`);
            }
            else if (commandInstance.isWatching()) {
                commandInstance._footerSpinner.color = 'black';
                commandsStatusTextArray.push(`{${color_1.default('terminal.primary').toString()}-bg} ${commandInstance._footerSpinner.frame()} (${commandInstance.key}) {/${color_1.default('terminal.primary').toString()}-bg}`);
            }
            else if (commandInstance.state === 'success') {
                commandInstance._footerSpinner.color = 'black';
                commandsStatusTextArray.push(`{${color_1.default('terminal.green').toString()}-bg} ${commandInstance._footerSpinner.frame()} (${commandInstance.key}) {/${color_1.default('terminal.green').toString()}-bg}`);
            }
            else if (commandInstance.state === 'error') {
                commandInstance._footerSpinner.color = 'black';
                commandsStatusTextArray.push(`{${color_1.default('terminal.red').toString()}-bg} ${commandInstance._footerSpinner.frame()} (${commandInstance.key}) {/${color_1.default('terminal.red').toString()}-bg}`);
            }
        }
        this._commandsStatusBox.width = countLine_1.default(blessed_1.default.stripTags(commandsStatusTextArray.join('')));
        this._commandsStatusBox.right =
            countLine_1.default(this._authorsBox.getContent()) + 1;
        this._commandsStatusBox.setContent(commandsStatusTextArray.join(''));
    }
    /**
     * @name            update
     * @type            Function
     * @override
     *
     * This method simply draw the header
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
        if (this._authorsBox) {
            this._authorsBox.width = countLine_1.default(this._authorsBox.content) + 1;
        }
        this.position.height = 1;
        // update status bar
        // this._updateStatusBar();
        super.update();
    }
};
//# sourceMappingURL=module.js.map