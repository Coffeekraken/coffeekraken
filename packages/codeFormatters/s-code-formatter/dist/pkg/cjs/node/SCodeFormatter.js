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
            resolve(formatResult[0].raw);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdHQUErRTtBQUMvRSwwRUFBbUQ7QUFDbkQsZ0VBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMscURBQXFEO0FBQ3JELCtDQUFxRTtBQUNyRSx1REFBeUQ7QUFDekQsbURBQTRFO0FBQzVFLHVEQUFzRDtBQUN0RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDBIQUFvRztBQW9FcEcsTUFBTSxjQUFlLFNBQVEsaUJBQVE7SUFNakM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBbUM7UUFDeEQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCwwREFBMEQsQ0FDN0QsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrR0FBa0csQ0FDckcsQ0FBQztTQUNMO1FBQ0QsMEJBQTBCO1FBQzFCLElBQUksY0FBYyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUNYLDJDQUEyQyxTQUFTLENBQUMsRUFBRSxrQ0FBa0MsQ0FDNUYsQ0FBQztTQUNMO1FBQ0QscUJBQXFCO1FBQ3JCLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxvQkFBb0I7UUFDdkIsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxN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