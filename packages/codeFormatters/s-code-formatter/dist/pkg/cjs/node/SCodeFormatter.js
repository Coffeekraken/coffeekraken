"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_code_formatter_prettier_1 = __importDefault(require("@coffeekraken/s-code-formatter-prettier"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const array_1 = require("@coffeekraken/sugar/array");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const SCodeFormatterFormatParamsInterface_1 = __importDefault(require("./interface/SCodeFormatterFormatParamsInterface"));
class SCodeFormatter extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            timeoutBetweenSameFileProcess: 1000,
            log: {
                summary: true,
                verbose: s_env_1.default.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name        registerFormatter
     * @type        Function
     * @static
     *
     * Register a new formatter by passing the ISCodeFormatterFormatter typed object
     *
     * @param       {ISCodeFormatterFormatter}      formatter       The formatter to register
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerFormatter(formatter) {
        // check formatter validity
        if (!formatter.id) {
            throw new Error(`Sorry but a code formatter MUST have an "id" property...`);
        }
        if (!formatter.extensions) {
            throw new Error(`Sorry but a code formatter MUST have an "extensions" property that list which files it handle...`);
        }
        // check if already exists
        if (SCodeFormatter._registeredFormatters[formatter.id]) {
            throw new Error(`Sorry but a code formatter with the id "${formatter.id}" has already been registered...`);
        }
        // save the formatter
        SCodeFormatter._registeredFormatters[formatter.id] = formatter;
    }
    /**
     * @name        getHandledExtensions
     * @type        Function
     * @static
     *
     * Return an array of all the handled extensions with the registered formatter
     *
     * @return      {String[]}                  An array of handled extensions
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getHandledExtensions() {
        let exts = [];
        for (let [id, formatter] of Object.entries(SCodeFormatter._registeredFormatters)) {
            exts = [...exts, ...formatter.extensions];
        }
        return (0, array_1.__unique)(exts);
    }
    /**
     * @name        getFormatterForExtension
     * @type        Function
     * @static
     *
     * Return the appropriate formatter depending on the passed extension
     *
     * @param       {String}        extension       The extension to get the formatter from
     * @return      {ISCodeFormatterFormatter}          The formatter object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getFormatterForExtension(extension) {
        var _a;
        for (let [id, formatter] of Object.entries(SCodeFormatter._registeredFormatters)) {
            if (formatter.extensions.includes(extension) ||
                ((_a = formatter
                    .languagesToExtensionsMap) === null || _a === void 0 ? void 0 : _a[extension])) {
                return formatter;
            }
        }
    }
    /**
     * @name            formatInline
     * @type            Function
     * @async
     *
     * This method allows you to format a passed string
     *
     * @param           {String}                code            The code to format
     * @param           {String}                language       The language of the passed code
     * @param           {Partial<ISCodeFormatterSettings>}                        [settings={}]       Specify an object of settings to configure your format process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    formatInline(code, language, settings) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // write the file in tmp folder
            const tmpFilePath = `${(0, path_1.__systemTmpDir)()}/s-code-formatter/${(0, string_1.__uniqid)()}.${language}`;
            (0, fs_1.__writeFileSync)(tmpFilePath, code);
            // format the code
            const formatResult = yield this.format({
                glob: path_2.default.basename(tmpFilePath),
                inDir: path_2.default.dirname(tmpFilePath),
                watch: false,
            }, settings);
            // resolve with formatted code
            // @ts-ignore
            resolve(formatResult[0].content);
        }));
    }
    /**
     * @name            format
     * @type            Function
     * @async
     *
     * This method allows you to actually format either a string of code (you will need to set the "language" param), of directly a file
     * by passing a file path.
     *
     * @param           {Partial<ISCodeFormatterFormatParams>}          [params={}]              Specify some parameters to format your code
     * @param           {Partial<ISCodeFormatterSettings>}                        [settings={}]       Specify an object of settings to configure your format process
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    format(params = {}, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = (0, object_1.__deepMerge)(this.settings, settings);
            const finalParams = SCodeFormatterFormatParamsInterface_1.default.apply(params);
            const formattedFiles = [];
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            if (finalSettings.log.summary) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Watch             : ${finalParams.watch
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Format initial    : ${finalParams.formatInitial
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                if (finalParams.watch) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[watch]</yellow> Watching for file changes...`,
                    });
                }
            }
            // watch using chokidar
            const filesPromise = (0, fs_1.__getFiles)(finalGlob, {
                cwd: finalParams.inDir,
                ignoreInitial: !finalParams.formatInitial,
                watch: finalParams.watch,
            });
            // handle no watch
            filesPromise.then(() => {
                resolve(formattedFiles);
            });
            // save all the file paths that has just been savec by the formatter
            // to avoid process it over and over...
            const savedStack = [];
            // listen for files change and add
            filesPromise.on('add,change', ({ file: filePath, resolve: resolveFile }) => __awaiter(this, void 0, void 0, function* () {
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = savedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                // get the file extension
                let extension = path_2.default
                    .extname(filePath)
                    .replace(/^\./, '');
                // get the relative to the package root file path
                let relFilePath = path_2.default.relative((0, path_1.__packageRootDir)(), filePath);
                // get the formatter for this file
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                const duration = new s_duration_1.default();
                let code;
                // grab the file content
                try {
                    code = fs_2.default
                        .readFileSync(filePath, 'utf-8')
                        .toString();
                }
                catch (e) {
                    return resolveFile();
                }
                // get the appropriate formatter for this extension
                if (!formatter) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        value: `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                    });
                    // add in stach
                    formattedFiles.push(s_file_1.default.new(filePath));
                    // resolve file
                    resolveFile();
                }
                else {
                    if (finalSettings.log.verbose) {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`,
                        });
                    }
                    try {
                        // apply the formatter on the file content
                        const result = yield formatter.format(code, {
                            filePath: filePath,
                            extension,
                        });
                        // avoid process the same file more than 1x by second
                        // this is to avoid issues with multiple formatt process that might
                        // save each in their corner and enter in a loop of formatting...
                        savedStack.push(filePath);
                        setTimeout(() => {
                            const savedFileIdx = savedStack.indexOf(filePath);
                            if (savedFileIdx !== -1) {
                                // remove the file for next process
                                savedStack.splice(savedFileIdx, 1);
                            }
                        }, finalSettings.timeoutBetweenSameFileProcess);
                        // write file back with formatted code
                        fs_2.default.writeFileSync(filePath, result.code, 'utf-8');
                        // add in stach
                        formattedFiles.push(s_file_1.default.new(filePath));
                        if (finalSettings.log.verbose) {
                            emit('log', {
                                clear: 1,
                                type: s_log_1.default.TYPE_INFO,
                                value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                            });
                        }
                    }
                    catch (e) {
                        console.error(e);
                        emit('log', {
                            type: s_log_1.default.TYPE_ERROR,
                            value: e.toString(),
                        });
                    }
                    // resole file
                    resolveFile();
                }
            }));
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
/**
 * Store the registered formatters
 */
SCodeFormatter._registeredFormatters = {};
SCodeFormatter.registerFormatter(s_code_formatter_prettier_1.default);
exports.default = SCodeFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdHQUErRTtBQUMvRSwwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwrQ0FBcUU7QUFDckUsdURBQXlEO0FBQ3pELG1EQUE0RTtBQUM1RSx1REFBc0Q7QUFDdEQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiwwSEFBb0c7QUErRHBHLE1BQU0sY0FBZSxTQUFRLGlCQUFRO0lBNkZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSw2QkFBNkIsRUFBRSxJQUFJO1lBQ25DLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsZUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTlHRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFtQztRQUN4RCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUNYLDBEQUEwRCxDQUM3RCxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUNYLGtHQUFrRyxDQUNyRyxDQUFDO1NBQ0w7UUFDRCwwQkFBMEI7UUFDMUIsSUFBSSxjQUFjLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BELE1BQU0sSUFB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