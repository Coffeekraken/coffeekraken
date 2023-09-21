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
const SCodeFormatterFormatParamsInterface_js_1 = __importDefault(require("./interface/SCodeFormatterFormatParamsInterface.js"));
class SCodeFormatter extends s_class_1.default {
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
            var _a;
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
            resolve((_a = formatResult[0]) === null || _a === void 0 ? void 0 : _a.raw);
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
            const finalParams = SCodeFormatterFormatParamsInterface_js_1.default.apply(params);
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
                var _a, _b;
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
                    (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`);
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
                        (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, {
                            clear: 1,
                            type: s_log_1.default.TYPE_INFO,
                            value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdHQUErRTtBQUMvRSwwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMscURBQXFEO0FBQ3JELCtDQUFxRTtBQUNyRSx1REFBeUQ7QUFDekQsbURBQTRFO0FBQzVFLHVEQUFzRDtBQUN0RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdJQUF1RztBQW9FdkcsTUFBTSxjQUFlLFNBQVEsaUJBQVE7SUFNakM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBbUM7UUFDeEQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCwwREFBMEQsQ0FDN0QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrR0FBa0csQ0FDckcsQ0FBQztTQUNMO1FBQ0QsMEJBQTBCO1FBQzFCLElBQUksY0FBYyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUNYLDJDQUEyQyxTQUFTLENBQUMsRUFBRSxrQ0FBa0MsQ0FDNUYsQ0FBQztTQUNMO1FBQ0QscUJBQXFCO1FBQ3JCLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxvQkFBb0I7UUFDdkIsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxN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