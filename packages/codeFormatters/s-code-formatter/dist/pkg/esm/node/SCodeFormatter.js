var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SCodeFormatterPrettier from '@coffeekraken/s-code-formatter-prettier';
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import { __unique } from '@coffeekraken/sugar/array';
import { __getFiles, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir, __systemTmpDir } from '@coffeekraken/sugar/path';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __path from 'path';
import __SCodeFormatterFormatParamsInterface from './interface/SCodeFormatterFormatParamsInterface';
class SCodeFormatter extends __SClass {
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
        super(__deepMerge({
            timeoutBetweenSameFileProcess: 1000,
            log: {
                summary: true,
                verbose: __SEnv.is('verbose'),
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
        return __unique(exts);
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
            const tmpFilePath = `${__systemTmpDir()}/s-code-formatter/${__uniqid()}.${language}`;
            __writeFileSync(tmpFilePath, code);
            // format the code
            const formatResult = yield this.format({
                glob: __path.basename(tmpFilePath),
                inDir: __path.dirname(tmpFilePath),
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
            const finalSettings = __deepMerge(this.settings, settings);
            const finalParams = __SCodeFormatterFormatParamsInterface.apply(params);
            const formattedFiles = [];
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            if (finalSettings.log.summary) {
                console.log(`<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`);
                console.log(`<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${__packageRootDir()}/`, '')}</cyan>`);
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
            const filesPromise = __getFiles(finalGlob, {
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
                let extension = __path.extname(filePath).replace(/^\./, '');
                // get the relative to the package root file path
                let relFilePath = __path.relative(__packageRootDir(), filePath);
                // get the formatter for this file
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                const duration = new __SDuration();
                let code;
                // grab the file content
                try {
                    code = __fs.readFileSync(filePath, 'utf-8').toString();
                }
                catch (e) {
                    return resolveFile();
                }
                // get the appropriate formatter for this extension
                if (!formatter) {
                    console.log(`<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`);
                    // add in stach
                    formattedFiles.push(__SFile.new(filePath));
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
                        __fs.writeFileSync(filePath, result.code, 'utf-8');
                        // add in stach
                        formattedFiles.push(__SFile.new(filePath));
                        (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, {
                            clear: 1,
                            type: __SLog.TYPE_INFO,
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
SCodeFormatter.registerFormatter(__SCodeFormatterPrettier);
export default SCodeFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sd0JBQXdCLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBK0RwRyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBNkZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSw2QkFBNkIsRUFBRSxJQUFJO1lBQ25DLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lB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