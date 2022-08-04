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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const getFiles_1 = __importDefault(require("@coffeekraken/sugar/node/fs/getFiles"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
        super((0, deepMerge_1.default)({
            timeoutBetweenSameFileProcess: 1000,
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
        return (0, unique_1.default)(exts);
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
        for (let [id, formatter] of Object.entries(SCodeFormatter._registeredFormatters)) {
            if (formatter.extensions.includes(extension)) {
                return formatter;
            }
        }
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
            const finalSettings = (0, deepMerge_1.default)(this.settings, settings);
            const finalParams = SCodeFormatterFormatParamsInterface_1.default.apply(params);
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir}</cyan>`,
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
            // watch using chokidar
            const filesPromise = (0, getFiles_1.default)(finalGlob, {
                cwd: finalParams.inDir,
                ignoreInitial: !finalParams.formatInitial,
                watch: finalParams.watch,
            });
            // handle no watch
            filesPromise.then(resolve);
            // save all the file paths that has just been savec by the formatter
            // to avoid process it over and over...
            const savedStack = [];
            // listen for files change and add
            filesPromise.on('add,change', ({ file, resolve: resolveFile }) => __awaiter(this, void 0, void 0, function* () {
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = savedStack.indexOf(file);
                if (savedFileIdx !== -1) {
                    return;
                }
                const relFilePath = path_1.default.relative((0, packageRoot_1.default)(), file);
                const duration = new s_duration_1.default();
                // grab the file content
                const code = fs_1.default
                    .readFileSync(file, 'utf-8')
                    .toString();
                // get the file extension
                const extension = path_1.default
                    .extname(file)
                    .replace(/^\./, '');
                // get the appropriate formatter for this extension
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                if (!formatter) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        value: `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                    });
                    // resole file
                    resolveFile();
                }
                else {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`,
                    });
                    try {
                        // apply the formatter on the file content
                        const result = yield formatter.format(code, {
                            filePath: file,
                            extension,
                        });
                        // avoid process the same file more than 1x by second
                        // this is to avoid issues with multiple formatt process that might
                        // save each in their corner and enter in a loop of formatting...
                        savedStack.push(file);
                        setTimeout(() => {
                            const savedFileIdx = savedStack.indexOf(file);
                            if (savedFileIdx !== -1) {
                                // remove the file for next process
                                savedStack.splice(savedFileIdx, 1);
                            }
                        }, finalSettings.timeoutBetweenSameFileProcess);
                        // write file back with formatted code
                        fs_1.default.writeFileSync(file, result.code, 'utf-8');
                        emit('log', {
                            clear: 1,
                            type: s_log_1.default.TYPE_INFO,
                            value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                    }
                    catch (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdHQUErRTtBQUMvRSwwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxvRkFBOEQ7QUFDOUQsNEZBQXNFO0FBQ3RFLHFGQUErRDtBQUMvRCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiwwSEFBb0c7QUF3RHBHLE1BQU0sY0FBZSxTQUFRLGlCQUFRO0lBMkZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSw2QkFBNkIsRUFBRSxJQUFJO1NBQ3RDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBeEdEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQW1DO1FBQ3hELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsMERBQTBELENBQzdELENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtRQUNELDBCQUEwQjtRQUMxQixJQUFJLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyQ0FBMkMsU0FBUyxDQUFDLEVBQUUsa0NBQWtDLENBQzVGLENBQUM7U0FDTDtRQUNELHFCQUFxQjtRQUNyQixjQUFjLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMs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