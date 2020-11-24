// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "blessed", "../color/color", "./SBlessedComponent", "../terminal/parseMarkdown", "../is/childProcess", "../string/parse", "../string/toString", "strip-ansi", "../string/trimLines", "../object/extractValues", "./interface/SOutputLogInterface", "./interface/SOutputSourceInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var blessed_1 = __importDefault(require("blessed"));
    var color_1 = __importDefault(require("../color/color"));
    var SBlessedComponent_1 = __importDefault(require("./SBlessedComponent"));
    var parseMarkdown_1 = __importDefault(require("../terminal/parseMarkdown"));
    var childProcess_1 = __importDefault(require("../is/childProcess"));
    var parse_1 = __importDefault(require("../string/parse"));
    var toString_1 = __importDefault(require("../string/toString"));
    var strip_ansi_1 = __importDefault(require("strip-ansi"));
    var trimLines_2 = __importDefault(require("../string/trimLines"));
    var extractValues_1 = __importDefault(require("../object/extractValues"));
    var SOutputLogInterface_1 = __importDefault(require("./interface/SOutputLogInterface"));
    var SOutputSourceInterface_1 = __importDefault(require("./interface/SOutputSourceInterface"));
    return /** @class */ (function (_super) {
        __extends(SOutput, _super);
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SOutput(source, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = this;
            var _settings = deepMerge_2.default({
                filter: null,
                maxItems: -1,
                maxItemsByGroup: 1,
                stacks: [
                    'log',
                    '*.log',
                    'warning',
                    '*.warning',
                    'warn',
                    '*.warn',
                    'error',
                    '*.error'
                ]
            }, settings);
            // extends SPanel
            _this = _super.call(this, _settings) || this;
            /**
             * @name          _process
             * @type          SOutput
             * @private
             *
             * Store the SOutput instance
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._process = null;
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
            _this._content = [];
            /**
             * @name          $logBox
             * @type          blessed.Box
             * @private
             *
             * Store the actual box where the logs will be pushed
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this.$logBox = null;
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
            _this.$headerBox = null;
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
            _this._clearTimeout = null;
            _this._allowClear = true;
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
            _this._currentModuleId = null;
            /**
             * @name            update
             * @type            Function
             *
             * This method take the content of the this._content property and display it correctly on the screen
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._lastY = 1;
            _this._lastContentCount = 0;
            _this.$logBoxChilds = [];
            _this._updateTimeout = null;
            _this._updateCountdown = 0;
            // generate keys UI
            _this._createLogBox();
            if (!Array.isArray(source))
                source = [source];
            source.forEach(function (s) {
                SOutputSourceInterface_1.default.apply(s, {
                    title: 'SOutput source issue',
                    description: 'One of the passed "source" for the SOutput class does not answer the minimal requirements of the "SOutputSourceInterface"...'
                });
                // subscribe to the process
                _this._subscribeToSource(s);
            });
            return _this;
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
        SOutput.prototype._subscribeToSource = function (s) {
            var _this = this;
            // subscribe to data
            s.on(this._settings.stacks.join(','), function (data, metas) {
                var _a;
                _this.log(__assign((_a = {}, _a[metas.stack.split('.').pop()] = true, _a), data));
            });
        };
        SOutput.prototype.clear = function () {
            var _this = this;
            if (childProcess_1.default()) {
                console.log(toString_1.default({
                    clear: true
                }));
            }
            else {
                clearTimeout(this._clearTimeout);
                this._clearTimeout = setTimeout(function () {
                    _this._allowClear = true;
                }, 200);
                if (this._allowClear) {
                    this._allowClear = false;
                    this._content = [];
                    this._lastY = 1;
                    try {
                        this.$logBoxChilds.forEach(function (child, i) {
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
        };
        SOutput.prototype._processMarkdown = function (content) {
            content = content.trim();
            content = parseMarkdown_1.default(content);
            return content;
        };
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
        SOutput.prototype._parseLog = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var logsArray = [];
            args.forEach(function (data) {
                if (typeof data === 'string') {
                    var splitedLogs = data.split(/⠀/);
                    splitedLogs.forEach(function (log) {
                        if (log.trim() === '')
                            return;
                        log = log.trim();
                        var parsedLog = parse_1.default(log);
                        if (typeof parsedLog === 'object' &&
                            parsedLog.value &&
                            typeof parsedLog.value === 'string') {
                            parsedLog = SOutputLogInterface_1.default.applyAndComplete(parsedLog);
                            logsArray.push(parsedLog);
                        }
                        else if (typeof parsedLog === 'string') {
                            if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
                                var args_1 = SOutputLogInterface_1.default.parseAndComplete(parsedLog);
                                logsArray.push(args_1);
                            }
                            else {
                                var args_2 = SOutputLogInterface_1.default.complete({
                                    value: parsedLog
                                });
                                logsArray.push(args_2);
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
                    data = SOutputLogInterface_1.default.applyAndComplete(data);
                    var splitedLogs = data.value.split(/⠀/);
                    splitedLogs.forEach(function (log) {
                        if (log.trim() === '')
                            return;
                        log = log.trim();
                        var parsedLog = parse_1.default(log);
                        if (typeof parsedLog === 'object' &&
                            parsedLog.value &&
                            typeof parsedLog.value === 'string') {
                            SOutputLogInterface_1.default.apply(parsedLog);
                            logsArray.push(__assign(__assign({}, data), parsedLog));
                        }
                        else if (typeof parsedLog === 'string') {
                            if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
                                var args_3 = SOutputLogInterface_1.default.parseAndComplete(parsedLog);
                                logsArray.push(__assign(__assign({}, data), args_3));
                            }
                            else {
                                logsArray.push(__assign(__assign({}, data), { value: parsedLog }));
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
            logsArray = logsArray.map(function (logObj) {
                if (typeof logObj.value !== 'string')
                    return logObj;
                var hashes = logObj.value.trim().match(/(\s|^)\#[a-zA-Z0-9:]+/gm);
                if (!hashes)
                    return logObj;
                hashes.forEach(function (hash) {
                    hash = hash.trim();
                    logObj.value = logObj.value.replace(hash, '').trim();
                    hash = hash.replace('#', '');
                    var splits = hash.split(':');
                    var prop = splits[0].trim();
                    var value = parse_1.default(splits[1] || true);
                    logObj[prop] = value;
                });
                return logObj;
            });
            return logsArray;
        };
        SOutput.prototype.log = function () {
            // await __wait(100);
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var logsObjArray = this._parseLog.apply(this, args);
            for (var i = 0; i < logsObjArray.length; i++) {
                var logObj = logsObjArray[i];
                if (logObj.clear) {
                    this.clear();
                    logsObjArray = [logObj];
                    break;
                }
            }
            // filter the content to remove the "temp" logs
            this._content = this._content.filter(function (logObj) {
                if (logObj.temp && logObj.$box) {
                    _this._lastY -= logObj.$box.height;
                    if (logObj.$box)
                        logObj.$box.destroy();
                    return false;
                }
                return true;
            });
            logsObjArray.forEach(function (logObj) {
                if (_this._settings.filter &&
                    typeof _this._settings.filter === 'function') {
                    var res = _this._settings.filter(logObj);
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
                var toStringValue = toString_1.default(logObj.value);
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
                    _this._createHeaderBox(logObj);
                }
                else if (logObj.group && typeof logObj.group === 'string') {
                    var actualGroupObjArray = _this._content.filter(function (item) {
                        if (typeof item !== 'object')
                            return false;
                        if (item.group === logObj.group)
                            return true;
                        return false;
                    });
                    var groupObj = {
                        group: logObj.group,
                        content: []
                    };
                    if (actualGroupObjArray.length) {
                        groupObj = actualGroupObjArray[0];
                    }
                    else {
                        if (_this._content.indexOf(groupObj) === -1)
                            _this._content.push(groupObj);
                    }
                    // if (groupObj.content.indexOf(processedLog) === -1)
                    groupObj.content.push(logObj);
                }
                else {
                    // if (this._content.indexOf(processedLog) === -1)
                    _this._content.push(logObj);
                }
            });
            // handle the maxItems setting
            if (this._settings.maxItems !== -1) {
                var itemsCount = 0;
                var newContent = [];
                for (var i = this._content.length - 1; i >= 0; i--) {
                    var item = this._content[i];
                    newContent = __spreadArrays([item], newContent);
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
        };
        SOutput.prototype.update = function () {
            var _this = this;
            if (childProcess_1.default())
                return;
            // if (!this.allowRender()) return;
            if (!this.isDisplayed())
                return;
            this._lastY = 1;
            if (!this._content.length // ||
            // this._lastContentCount === this._content.length
            ) {
                _super.prototype.update.call(this);
                return;
            }
            if (this._lastContentCount !== this._content.length) {
                this._updateCountdown = 5;
            }
            this._content.forEach(function (item) {
                if (item.$box) {
                    if (item.group) {
                        var contentArray = void 0;
                        if (_this._settings.maxItemsByGroup) {
                            contentArray = item.content.slice(_this._settings.maxItemsByGroup * -1);
                        }
                        else {
                            contentArray = item.content;
                        }
                        var logsString = extractValues_1.default(contentArray, 'value')
                            .map(function (l) {
                            return parseMarkdown_1.default(l);
                        })
                            .join('\n');
                        item.$box.setContent(trimLines_2.default(item.$box.title + "\n               " + logsString));
                        item.$box.height = logsString.split('\n').length + 1;
                        item.$box.$line.height = logsString.split('\n').length + 1;
                    }
                    else {
                    }
                    item.$box.top = _this._lastY + (item.mt || 0);
                    _this._lastY +=
                        item.$box.getScrollHeight() + (item.mt || 0) + (item.mb || 1);
                }
                else if (item.value && typeof item.value === 'string' && item.error) {
                    var $box = _this._errorTextBox(item.value);
                    $box.top = _this._lastY + item.mt;
                    _this.$logBoxChilds.push($box);
                    _this.$logBox.append($box);
                    item.$box = $box;
                    _this._lastY += $box.getScrollHeight() + item.mt + item.mb;
                }
                else if (item.value && typeof item.value === 'string' && item.warning) {
                    var $box = _this._warningTextBox(item.value);
                    $box.top = _this._lastY + item.mt;
                    _this.$logBoxChilds.push($box);
                    _this.$logBox.append($box);
                    item.$box = $box;
                    _this._lastY += $box.getScrollHeight() + item.mt + item.mb;
                }
                else if (item.value && typeof item.value === 'string') {
                    var $box = _this._simpleTextBox(item.value);
                    $box.top = _this._lastY + item.mt;
                    _this.$logBoxChilds.push($box);
                    _this.$logBox.append($box);
                    item.$box = $box;
                    _this._lastY += $box.getScrollHeight() + item.mt + item.mb;
                }
                else if (typeof item === 'object' && item.group) {
                    var $box = _this._groupBox(item.group, item.content);
                    $box.top = _this._lastY;
                    _this.$logBoxChilds.push($box);
                    item.$box = $box;
                    _this.$logBox.append($box);
                    _this._lastY += $box.getScrollHeight() + 1;
                }
                else {
                    var value = '' + item.value;
                    var $box = _this._simpleTextBox(value);
                    $box.top = _this._lastY + item.mt;
                    _this.$logBoxChilds.push($box);
                    _this.$logBox.append($box);
                    item.$box = $box;
                    _this._lastY += $box.getScrollHeight() + item.mt + item.mb;
                }
            });
            this.$logBox.setScrollPerc(100);
            this._lastContentCount = this._content.length;
            _super.prototype.update.call(this);
            if (this._updateCountdown > 0) {
                setTimeout(function () {
                    _this.update();
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
        };
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
        SOutput.prototype._simpleTextBox = function (text) {
            var $box = blessed_1.default.box({
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
            $box.on('attach', function () {
                setTimeout(function () {
                    $box.height = $box.getScrollHeight();
                    // $box.append($line);
                });
            });
            return $box;
        };
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
        SOutput.prototype._errorTextBox = function (text) {
            var $box = blessed_1.default.box({
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
            var $line = blessed_1.default.box({
                width: 1,
                height: 1,
                top: 0,
                left: $box.padding.left * -1,
                bottom: 0,
                style: {
                    bg: color_1.default('terminal.red').toString()
                }
            });
            $box.on('attach', function () {
                setTimeout(function () {
                    $box.height = $box.getScrollHeight();
                    $line.height = $box.getScrollHeight();
                    $box.append($line);
                });
            });
            return $box;
        };
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
        SOutput.prototype._warningTextBox = function (text) {
            var $box = blessed_1.default.box({
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
            var $line = blessed_1.default.box({
                width: 1,
                height: 1,
                top: 0,
                left: $box.padding.left * -1,
                bottom: 0,
                style: {
                    bg: color_1.default('terminal.yellow').toString()
                }
            });
            $box.on('attach', function () {
                setTimeout(function () {
                    $box.height = $box.getScrollHeight();
                    $line.height = $box.getScrollHeight();
                    $box.append($line);
                });
            });
            return $box;
        };
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
        SOutput.prototype._groupBox = function (group, textsArray) {
            var $box = blessed_1.default.box({
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
            var color = group.toLowerCase().includes('error') ? 'red' : 'yellow';
            var title = parseMarkdown_1.default(group.toLowerCase().includes('error')
                ? "<red>" + group + "</red>"
                : "<yellow>" + group + "</yellow>");
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
            var $line = blessed_1.default.box({
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
            $box.on('attach', function () {
                setTimeout(function () {
                    $box.height = $box.getScrollHeight();
                    $line.height = $box.getScrollHeight();
                    $box.append($line);
                });
            });
            return $box;
        };
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
        SOutput.prototype._createHeaderBox = function (logObj) {
            var _this = this;
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
            var $line = blessed_1.default.box({
                height: 1,
                bottom: -1,
                left: 0,
                style: {
                    fg: 'yellow'
                }
            });
            this.$headerBox.$line = $line;
            this.$headerBox.on('attach', function () {
                setTimeout(function () {
                    // this.$headerBox.height = this.$headerBox.getScrollHeight() + 4;
                    $line.setContent('_'.repeat(_this.$headerBox.width));
                    _this.$headerBox.append($line);
                });
            });
            this.append(this.$headerBox);
            this.$logBox.top = this.$headerBox.height - 2;
            return this.$headerBox;
        };
        /**
         * @name          _createLogBox
         * @type          Function
         * @private
         *
         * This method take the registered keys in the process and generate a nice and clean UI for it
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SOutput.prototype._createLogBox = function () {
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
        };
        return SOutput;
    }(SBlessedComponent_1.default));
});
