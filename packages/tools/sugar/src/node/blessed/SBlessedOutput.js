"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const color_1 = __importDefault(require("../color/color"));
const SBlessedComponent_1 = __importDefault(require("./SBlessedComponent"));
const parseMarkdown_1 = __importDefault(require("../terminal/parseMarkdown"));
const childProcess_1 = __importDefault(require("../is/childProcess"));
const parse_1 = __importDefault(require("../string/parse"));
const toString_1 = __importDefault(require("../string/toString"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const trimLines_1 = __importDefault(require("../string/trimLines"));
const extractValues_1 = __importDefault(require("../object/extractValues"));
const SOutputLogInterface_1 = __importDefault(require("./interface/SOutputLogInterface"));
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
module.exports = class SOutput extends SBlessedComponent_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(source, settings = {}) {
        const _settings = deepMerge_1.default({
            filter: null,
            maxItems: -1,
            maxItemsByGroup: 1,
            stacks: [
                'log',
                '*.log',
                'warning',
                '*.warning',
                'warn',
                '*.warn'
                // 'error',
                // '*.error'
            ]
        }, settings);
        // extends SPanel
        super(_settings);
        /**
         * @name          _process
         * @type          SOutput
         * @private
         *
         * Store the SOutput instance
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._process = null;
        /**
         * @name          _content
         * @type          Array
         * @private
         *
         * Store the content depending on his formatting style like groups, etc...
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._content = [];
        /**
         * @name          $logBox
         * @type          blessed.Box
         * @private
         *
         * Store the actual box where the logs will be pushed
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.$logBox = null;
        /**
         * @name           $headerBox
         * @type          blessed.box
         * @private
         *
         * Store the header content if a log object has the property "type" to "header"
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.$headerBox = null;
        /**
         *
         * @name          clear
         * @type          Function
         *
         * This method simply clear the output
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._clearTimeout = null;
        this._allowClear = true;
        /**
         * @name          log
         * @type          Function
         *
         * This method simply log the passed arguments
         *
         * @param       {Mixed}         ...args         The arguments you want to log
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentModuleId = null;
        /**
         * @name            update
         * @type            Function
         *
         * This method take the content of the this._content property and display it correctly on the screen
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._lastY = 1;
        this._lastContentCount = 0;
        this.$logBoxChilds = [];
        this._updateTimeout = null;
        this._updateCountdown = 0;
        // generate keys UI
        this._createLogBox();
        if (!Array.isArray(source))
            source = [source];
        source.forEach((s) => {
            // __SOutputSourceInterface.apply(s, {
            //   title: 'SOutput source issue',
            //   description:
            //     'One of the passed "source" for the SOutput class does not answer the minimal requirements of the "SOutputSourceInterface"...'
            // });
            // todo     check why it's not working...
            // subscribe to the process
            this._subscribeToSource(s);
        });
    }
    /**
     * @name          _subscribeToSource
     * @type          Function
     * @private
     *
     * This method simply listen to the process and log the values getted
     * from it into the panel
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _subscribeToSource(s) {
        // subscribe to data
        s.on(this._settings.stacks.join(','), (data, metas) => {
            this.log(Object.assign({ [metas.stack.split('.').pop()]: true }, data));
        });
    }
    clear() {
        if (childProcess_1.default()) {
            console.log(toString_1.default({
                clear: true
            }));
        }
        else {
            clearTimeout(this._clearTimeout);
            this._clearTimeout = setTimeout(() => {
                this._allowClear = true;
            }, 200);
            if (this._allowClear) {
                this._allowClear = false;
                this._content = [];
                this._lastY = 1;
                try {
                    this.$logBoxChilds.forEach((child, i) => {
                        child.destroy();
                    });
                    if (this.$headerBox) {
                        this.$headerBox.destroy();
                        this.$headerBox = null;
                        this.$logBox.top = 0;
                    }
                    this.$logBoxChilds = [];
                    this.$logBox.setScrollPerc(0);
                    this.update();
                }
                catch (e) { }
            }
        }
    }
    _processMarkdown(content) {
        content = content.trim();
        content = parseMarkdown_1.default(content);
        return content;
    }
    /**
     * @name          _parseLog
     * @type          Function
     * @private
     *
     * This method take a simple string or a complexe data object and parse them to
     * generate a nicely formated log object to pass to the ```log``` method.
     *
     * @param       {String|Object}           data           The log data to parse
     * @return      {Array<Object>}                           An array of nicely formated log object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _parseLog(...args) {
        let logsArray = [];
        args.forEach((data) => {
            if (typeof data === 'string') {
                const splitedLogs = data.split(/⠀/);
                splitedLogs.forEach((log) => {
                    if (log.trim() === '')
                        return;
                    log = log.trim();
                    const parsedLog = parse_1.default(log);
                    if (typeof parsedLog === 'object' &&
                        parsedLog.value &&
                        typeof parsedLog.value === 'string') {
                        parsedLog = SOutputLogInterface_1.default.apply(parsedLog);
                        logsArray.push(parsedLog);
                    }
                    else if (typeof parsedLog === 'string') {
                        if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
                            const args = parseArgs_1.default(parsedLog, {
                                definition: SOutputLogInterface_1.default.definition
                            });
                            SOutputLogInterface_1.default.apply(args);
                            logsArray.push(args);
                        }
                        else {
                            const args = {
                                value: parsedLog
                            };
                            SOutputLogInterface_1.default.apply(args);
                            logsArray.push(args);
                        }
                    }
                    else {
                        logsArray.push({
                            value: toString_1.default(parsedLog, {
                                beautify: true
                            })
                        });
                    }
                });
            }
            else if (typeof data === 'object' &&
                data.value &&
                typeof data.value === 'string') {
                // apply the interface
                SOutputLogInterface_1.default.apply(data);
                const splitedLogs = data.value.split(/⠀/);
                splitedLogs.forEach((log) => {
                    if (log.trim() === '')
                        return;
                    log = log.trim();
                    const parsedLog = parse_1.default(log);
                    if (typeof parsedLog === 'object' &&
                        parsedLog.value &&
                        typeof parsedLog.value === 'string') {
                        SOutputLogInterface_1.default.apply(parsedLog);
                        logsArray.push(Object.assign(Object.assign({}, data), parsedLog));
                    }
                    else if (typeof parsedLog === 'string') {
                        if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
                            const args = parseArgs_1.default(parsedLog, {
                                definition: SOutputLogInterface_1.default.definition
                            });
                            SOutputLogInterface_1.default.apply(parsedLog);
                            logsArray.push(Object.assign(Object.assign({}, data), args));
                        }
                        else {
                            logsArray.push(Object.assign(Object.assign({}, data), { value: parsedLog }));
                        }
                    }
                    else {
                        logsArray.push({
                            value: toString_1.default(parsedLog, {
                                beautify: true
                            })
                        });
                    }
                });
            }
            else {
                logsArray.push({
                    value: toString_1.default(data, {
                        beautify: true
                    })
                });
            }
        });
        logsArray = logsArray.map((logObj) => {
            if (typeof logObj.value !== 'string')
                return logObj;
            let hashes = logObj.value.trim().match(/(\s|^)\#[a-zA-Z0-9:]+/gm);
            if (!hashes)
                return logObj;
            hashes.forEach((hash) => {
                hash = hash.trim();
                logObj.value = logObj.value.replace(hash, '').trim();
                hash = hash.replace('#', '');
                const splits = hash.split(':');
                const prop = splits[0].trim();
                const value = parse_1.default(splits[1] || true);
                logObj[prop] = value;
            });
            return logObj;
        });
        return logsArray;
    }
    log(...args) {
        // await __wait(100);
        let logsObjArray = this._parseLog(...args);
        for (let i = 0; i < logsObjArray.length; i++) {
            const logObj = logsObjArray[i];
            if (logObj.clear) {
                this.clear();
                logsObjArray = [logObj];
                break;
            }
        }
        // filter the content to remove the "temp" logs
        this._content = this._content.filter((logObj) => {
            if (logObj.temp && logObj.$box) {
                this._lastY -= logObj.$box.height;
                if (logObj.$box)
                    logObj.$box.destroy();
                return false;
            }
            return true;
        });
        logsObjArray.forEach((logObj) => {
            if (this._settings.filter &&
                typeof this._settings.filter === 'function') {
                const res = this._settings.filter(logObj);
                if (res === false)
                    return;
                if (res !== true)
                    logObj = res;
            }
            if (!logObj) {
                return;
            }
            if (childProcess_1.default()) {
                console.log(toString_1.default(logObj));
                return;
            }
            const toStringValue = toString_1.default(logObj.value);
            if (logObj.value.includes('[?1049h')) {
                logObj.value = logObj.value.slice(40);
            } // ugly hack that need to be checked...
            if (strip_ansi_1.default(logObj.value).trim().length === 0)
                return;
            if (typeof logObj.value !== 'string')
                logObj.value = toString_1.default(logObj.value);
            // replace the package root in the log
            // logObj.value = logObj.value.split(`${__packageRoot()}/`).join('');
            // if (logObj.module && typeof logObj.module === 'object') {
            //   if (logObj.module.id && logObj.module.id !== this._currentModuleId) {
            //     this._currentModuleId = logObj.module.id;
            //     this._content.push({
            //       value: __parseMarkdown(
            //         `<bgPrimary><black> ${logObj.module.name || logObj.module.id} (${
            //           logObj.module.id || logObj.module.idx
            //         }) </black></bgPrimary>`
            //       )
            //     });
            //   }
            // }
            if (logObj.type && logObj.type === 'header') {
                // generate the header box
                this._createHeaderBox(logObj);
            }
            else if (logObj.group && typeof logObj.group === 'string') {
                const actualGroupObjArray = this._content.filter((item) => {
                    if (typeof item !== 'object')
                        return false;
                    if (item.group === logObj.group)
                        return true;
                    return false;
                });
                let groupObj = {
                    group: logObj.group,
                    content: []
                };
                if (actualGroupObjArray.length) {
                    groupObj = actualGroupObjArray[0];
                }
                else {
                    if (this._content.indexOf(groupObj) === -1)
                        this._content.push(groupObj);
                }
                // if (groupObj.content.indexOf(processedLog) === -1)
                groupObj.content.push(logObj);
            }
            else {
                // if (this._content.indexOf(processedLog) === -1)
                this._content.push(logObj);
            }
        });
        // handle the maxItems setting
        if (this._settings.maxItems !== -1) {
            let itemsCount = 0;
            let newContent = [];
            for (let i = this._content.length - 1; i >= 0; i--) {
                const item = this._content[i];
                newContent = [item, ...newContent];
                itemsCount++;
                // stop if we reach the maxItems count
                if (itemsCount >= this._settings.maxItems) {
                    break;
                }
            }
            // save the new content
            this._content = newContent;
        }
        // update display
        this.update();
    }
    update() {
        if (childProcess_1.default())
            return;
        // if (!this.allowRender()) return;
        if (!this.isDisplayed())
            return;
        this._lastY = 1;
        if (!this._content.length // ||
        // this._lastContentCount === this._content.length
        ) {
            super.update();
            return;
        }
        if (this._lastContentCount !== this._content.length) {
            this._updateCountdown = 5;
        }
        this._content.forEach((item) => {
            if (item.$box) {
                if (item.group) {
                    let contentArray;
                    if (this._settings.maxItemsByGroup) {
                        contentArray = item.content.slice(this._settings.maxItemsByGroup * -1);
                    }
                    else {
                        contentArray = item.content;
                    }
                    const logsString = extractValues_1.default(contentArray, 'value')
                        .map((l) => {
                        return parseMarkdown_1.default(l);
                    })
                        .join('\n');
                    item.$box.setContent(trimLines_1.default(`${item.$box.title}
               ${logsString}`));
                    item.$box.height = logsString.split('\n').length + 1;
                    item.$box.$line.height = logsString.split('\n').length + 1;
                }
                else {
                }
                item.$box.top = this._lastY + (item.mt || 0);
                this._lastY +=
                    item.$box.getScrollHeight() + (item.mt || 0) + (item.mb || 1);
            }
            else if (item.value && typeof item.value === 'string' && item.error) {
                const $box = this._errorTextBox(item.value);
                $box.top = this._lastY + item.mt;
                this.$logBoxChilds.push($box);
                this.$logBox.append($box);
                item.$box = $box;
                this._lastY += $box.getScrollHeight() + item.mt + item.mb;
            }
            else if (item.value && typeof item.value === 'string' && item.warning) {
                const $box = this._warningTextBox(item.value);
                $box.top = this._lastY + item.mt;
                this.$logBoxChilds.push($box);
                this.$logBox.append($box);
                item.$box = $box;
                this._lastY += $box.getScrollHeight() + item.mt + item.mb;
            }
            else if (item.value && typeof item.value === 'string') {
                const $box = this._simpleTextBox(item.value);
                $box.top = this._lastY + item.mt;
                this.$logBoxChilds.push($box);
                this.$logBox.append($box);
                item.$box = $box;
                this._lastY += $box.getScrollHeight() + item.mt + item.mb;
            }
            else if (typeof item === 'object' && item.group) {
                const $box = this._groupBox(item.group, item.content);
                $box.top = this._lastY;
                this.$logBoxChilds.push($box);
                item.$box = $box;
                this.$logBox.append($box);
                this._lastY += $box.getScrollHeight() + 1;
            }
            else {
                const value = '' + item.value;
                const $box = this._simpleTextBox(value);
                $box.top = this._lastY + item.mt;
                this.$logBoxChilds.push($box);
                this.$logBox.append($box);
                item.$box = $box;
                this._lastY += $box.getScrollHeight() + item.mt + item.mb;
            }
        });
        this.$logBox.setScrollPerc(100);
        this._lastContentCount = this._content.length;
        super.update();
        if (this._updateCountdown > 0) {
            setTimeout(() => {
                this.update();
            }, 200);
            this._updateCountdown--;
        }
        // setTimeout(() => {
        //   console.log('render');
        //   super.update();
        //   super.update();
        //   super.update();
        //   super.update();
        //   super.update();
        //   super.update();
        //   super.update();
        // }, 200);
        // await __wait(200);
        // console.log('CCCC');
        // super.update();
        // await __wait(200);
        // console.log('CCCC');
        // super.update();
        // await __wait(200);
        // console.log('CCCC');
        // super.update();
    }
    /**
     * @name          _simpleTextBox
     * @type          Function
     * @private
     *
     * This method take a text as input and return a blessed box
     * representing this text to display
     *
     * @param       {String}        text        The text to display
     * @return      {Blessed.box}               A blessed box instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _simpleTextBox(text) {
        const $box = blessed_1.default.box({
            width: this.$logBox.width -
                this.$logBox.padding.left -
                this.$logBox.padding.right,
            height: 'shrink',
            style: {
                fg: 'white'
            },
            scrollable: true,
            padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            content: parseMarkdown_1.default(text)
        });
        // const $line = __blessed.box({
        //   width: 1,
        //   height: 1,
        //   top: 0,
        //   left: $box.padding.left * -1,
        //   bottom: 0,
        //   style: {
        //     bg: __color('terminal.secondary').toString()
        //   }
        // });
        $box.on('attach', () => {
            setTimeout(() => {
                $box.height = $box.getScrollHeight();
                // $box.append($line);
            });
        });
        return $box;
    }
    /**
     * @name          _errorTextBox
     * @type          Function
     * @private
     *
     * This method take a text as input and return a blessed box
     * representing this text to display
     *
     * @param       {String}        text        The text to display
     * @return      {Blessed.box}               A blessed box instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _errorTextBox(text) {
        const $box = blessed_1.default.box({
            width: this.$logBox.width -
                this.$logBox.padding.left -
                this.$logBox.padding.right,
            height: 'shrink',
            style: {
                fg: 'white'
            },
            scrollable: true,
            padding: {
                top: 0,
                left: 4,
                right: 0,
                bottom: 0
            },
            content: parseMarkdown_1.default(text)
        });
        const $line = blessed_1.default.box({
            width: 1,
            height: 1,
            top: 0,
            left: $box.padding.left * -1,
            bottom: 0,
            style: {
                bg: color_1.default('terminal.red').toString()
            }
        });
        $box.on('attach', () => {
            setTimeout(() => {
                $box.height = $box.getScrollHeight();
                $line.height = $box.getScrollHeight();
                $box.append($line);
            });
        });
        return $box;
    }
    /**
     * @name          _warningTextBox
     * @type          Function
     * @private
     *
     * This method take a text as input and return a blessed box
     * representing this text to display
     *
     * @param       {String}        text        The text to display
     * @return      {Blessed.box}               A blessed box instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _warningTextBox(text) {
        const $box = blessed_1.default.box({
            width: this.$logBox.width -
                this.$logBox.padding.left -
                this.$logBox.padding.right,
            height: 'shrink',
            style: {
                fg: 'white'
            },
            scrollable: true,
            padding: {
                top: 0,
                left: 4,
                right: 0,
                bottom: 0
            },
            content: parseMarkdown_1.default(text)
        });
        const $line = blessed_1.default.box({
            width: 1,
            height: 1,
            top: 0,
            left: $box.padding.left * -1,
            bottom: 0,
            style: {
                bg: color_1.default('terminal.yellow').toString()
            }
        });
        $box.on('attach', () => {
            setTimeout(() => {
                $box.height = $box.getScrollHeight();
                $line.height = $box.getScrollHeight();
                $box.append($line);
            });
        });
        return $box;
    }
    /**
     * @name          _simpleTextBox
     * @type          Function
     * @private
     *
     * This method take a text as input and return a blessed box
     * representing this text to display
     *
     * @param       {String}        text        The text to display
     * @return      {Blessed.box}               A blessed box instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _groupBox(group, textsArray) {
        const $box = blessed_1.default.box({
            width: this.$logBox.width -
                this.$logBox.padding.left -
                this.$logBox.padding.right,
            height: 'shrink',
            style: {
                fg: 'white'
            },
            scrollable: true,
            padding: {
                top: 0,
                left: 2,
                right: 0,
                bottom: 0
            }
        });
        const color = group.toLowerCase().includes('error') ? 'red' : 'yellow';
        const title = parseMarkdown_1.default(group.toLowerCase().includes('error')
            ? `<red>${group}</red>`
            : `<yellow>${group}</yellow>`);
        $box.title = title;
        // if (this._settings.maxItemsByGroup === -1) {
        //   const logsString = __extractValues(textsArray, 'value').join('\n');
        //   $box.setContent(
        //     __trimLines(`${title}
        //   ${__parseMarkdown(logsString)}`)
        //   );
        // } else {
        //   const contents = textsArray.slice(this._settings.maxItemsByGroup * -1);
        //   const logsString = __extractValues(contents, 'value').join('\n');
        //   $box.setContent(
        //     __trimLines(`${title}
        //   ${__parseMarkdown(logsString)}`)
        //   );
        // }
        const $line = blessed_1.default.box({
            width: 1,
            height: 1,
            top: 0,
            left: $box.padding.left * -1,
            bottom: 0,
            style: {
                bg: 'yellow'
            }
        });
        if (color === 'red') {
            $line.style.bg = 'red';
        }
        $box.$line = $line;
        $box.on('attach', () => {
            setTimeout(() => {
                $box.height = $box.getScrollHeight();
                $line.height = $box.getScrollHeight();
                $box.append($line);
            });
        });
        return $box;
    }
    /**
     * @name          _createHeaderBox
     * @type          Function
     * @private
     *
     * This emthod take a logObj that has the property "type" to "header" and generate a
     * header box based on the blessed.box function.
     *
     * @param       {Object}      logObj          The logObj to use to generate the header box
     * @return      {blessed.box}                 Return the blessed.box instance also saved in the "$headerBox" instance property
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _createHeaderBox(logObj) {
        this.$headerBox = blessed_1.default.box({
            width: 'shrink',
            height: 8,
            top: 0,
            left: 1,
            right: 1,
            bottom: 0,
            style: {},
            mouse: true,
            keys: true,
            scrollable: true,
            // border: {
            //   type: 'line'
            // },
            style: {
            // border: {
            //   fg: __color('terminal.primary').toString()
            // },
            },
            content: parseMarkdown_1.default(logObj.value),
            padding: {
                top: 1,
                left: 1,
                right: 1,
                bottom: 1
            }
        });
        const $line = blessed_1.default.box({
            height: 1,
            bottom: -1,
            left: 0,
            style: {
                fg: 'yellow'
            }
        });
        this.$headerBox.$line = $line;
        this.$headerBox.on('attach', () => {
            setTimeout(() => {
                // this.$headerBox.height = this.$headerBox.getScrollHeight() + 4;
                $line.setContent('_'.repeat(this.$headerBox.width));
                this.$headerBox.append($line);
            });
        });
        this.append(this.$headerBox);
        this.$logBox.top = this.$headerBox.height - 2;
        return this.$headerBox;
    }
    /**
     * @name          _createLogBox
     * @type          Function
     * @private
     *
     * This method take the registered keys in the process and generate a nice and clean UI for it
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _createLogBox() {
        // if (this.$logBox) {
        //   this.$logBox.destroy();
        //   this.$logBox = null;
        // }
        this.$logBox = blessed_1.default.box({
            // width: '100%-4',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            style: {},
            mouse: true,
            keys: true,
            scrollable: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            style: {
                scrollbar: {
                    bg: color_1.default('terminal.primary').toString()
                }
            },
            padding: {
                top: 0,
                left: 2,
                right: 2,
                bottom: 0
            }
        });
        this.append(this.$logBox);
    }
};
//# sourceMappingURL=SBlessedOutput.js.map