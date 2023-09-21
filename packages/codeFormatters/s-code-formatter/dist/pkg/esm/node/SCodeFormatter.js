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
import __SCodeFormatterFormatParamsInterface from './interface/SCodeFormatterFormatParamsInterface.js';
class SCodeFormatter extends __SClass {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sd0JBQXdCLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLG9EQUFvRCxDQUFDO0FBb0V2RyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBTWpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQW1DO1FBQ3hELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsMERBQTBELENBQzdELENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtR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