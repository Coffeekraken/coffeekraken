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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = (0, object_1.__deepMerge)(this.settings, settings);
            const finalParams = SCodeFormatterFormatParamsInterface_1.default.apply(params);
            const formattedFiles = [];
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            if (finalSettings.log.summary) {
                console.log(`<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`);
                console.log(`<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${(0, path_1.__packageRootDir)()}/`, '')}</cyan>`);
                console.log(`<yellow>○</yellow> Watch             : ${finalParams.watch
                    ? `<green>true</green>`
                    : `<red>false</red>`}`);
                console.log(`<yellow>○</yellow> Format initial    : ${finalParams.formatInitial
                    ? `<green>true</green>`
                    : `<red>false</red>`}`);
                if (finalParams.watch) {
                    console.log(`<yellow>[watch]</yellow> Watching for file changes...`);
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
                let extension = path_2.default.extname(filePath).replace(/^\./, '');
                // get the relative to the package root file path
                let relFilePath = path_2.default.relative((0, path_1.__packageRootDir)(), filePath);
                // get the formatter for this file
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                const duration = new s_duration_1.default();
                let code;
                // grab the file content
                try {
                    code = fs_2.default.readFileSync(filePath, 'utf-8').toString();
                }
                catch (e) {
                    return resolveFile();
                }
                // get the appropriate formatter for this extension
                if (!formatter) {
                    console.log(`<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`);
                    // add in stach
                    formattedFiles.push(s_file_1.default.new(filePath));
                    // resolve file
                    resolveFile();
                }
                else {
                    if (finalSettings.log.verbose) {
                        console.log(`<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`);
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
                            console.log({
                                clear: 1,
                                type: s_log_1.default.TYPE_INFO,
                                value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                            });
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                    // resole file
                    resolveFile();
                }
            }));
        }));
    }
}
/**
 * Store the registered formatters
 */
SCodeFormatter._registeredFormatters = {};
SCodeFormatter.registerFormatter(s_code_formatter_prettier_1.default);
exports.default = SCodeFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdHQUErRTtBQUMvRSwwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMscURBQXFEO0FBQ3JELCtDQUFxRTtBQUNyRSx1REFBeUQ7QUFDekQsbURBQTRFO0FBQzVFLHVEQUFzRDtBQUN0RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDBIQUFvRztBQStEcEcsTUFBTSxjQUFlLFNBQVEsaUJBQVE7SUE2RmpDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLDZCQUE2QixFQUFFLElBQUk7WUFDbkMsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUNoQztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBOUdEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQW1DO1FBQ3hELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsMERBQTBELENBQzdELENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtRQUNELDBCQUEwQjtRQUMxQixJQUFJLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwy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