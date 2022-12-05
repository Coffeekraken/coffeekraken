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
import __SPromise from '@coffeekraken/s-promise';
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = __deepMerge(this.settings, settings);
            const finalParams = __SCodeFormatterFormatParamsInterface.apply(params);
            const formattedFiles = [];
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            if (finalSettings.log.summary) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(`${__packageRootDir()}/`, '')}</cyan>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Watch             : ${finalParams.watch
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Format initial    : ${finalParams.formatInitial
                        ? `<green>true</green>`
                        : `<red>false</red>`}`,
                });
                if (finalParams.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[watch]</yellow> Watching for file changes...`,
                    });
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
                // avoid to process in loop the same file saved over and over
                const savedFileIdx = savedStack.indexOf(filePath);
                if (savedFileIdx !== -1) {
                    return;
                }
                // get the file extension
                let extension = __path
                    .extname(filePath)
                    .replace(/^\./, '');
                // get the relative to the package root file path
                let relFilePath = __path.relative(__packageRootDir(), filePath);
                // get the formatter for this file
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                const duration = new __SDuration();
                let code;
                // grab the file content
                try {
                    code = __fs
                        .readFileSync(filePath, 'utf-8')
                        .toString();
                }
                catch (e) {
                    return resolveFile();
                }
                // get the appropriate formatter for this extension
                if (!formatter) {
                    emit('log', {
                        type: __SLog.TYPE_WARN,
                        value: `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                    });
                    // add in stach
                    formattedFiles.push(__SFile.new(filePath));
                    // resolve file
                    resolveFile();
                }
                else {
                    if (finalSettings.log.verbose) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
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
                        __fs.writeFileSync(filePath, result.code, 'utf-8');
                        // add in stach
                        formattedFiles.push(__SFile.new(filePath));
                        if (finalSettings.log.verbose) {
                            emit('log', {
                                clear: 1,
                                type: __SLog.TYPE_INFO,
                                value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                            });
                        }
                    }
                    catch (e) {
                        console.error(e);
                        emit('log', {
                            type: __SLog.TYPE_ERROR,
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
SCodeFormatter.registerFormatter(__SCodeFormatterPrettier);
export default SCodeFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sd0JBQXdCLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBK0RwRyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBNkZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSw2QkFBNkIsRUFBRSxJQUFJO1lBQ25DLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIs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