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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __getFiles from '@coffeekraken/sugar/node/fs/getFiles';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalSettings = __deepMerge(this.settings, settings);
            const finalParams = __SCodeFormatterFormatParamsInterface.apply(params);
            let finalGlob = finalParams.glob;
            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir}</cyan>`,
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
            // watch using chokidar
            const filesPromise = __getFiles(finalGlob, {
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
                const relFilePath = __path.relative(__packageRoot(), file);
                const duration = new __SDuration();
                let code;
                // grab the file content
                try {
                    code = __fs
                        .readFileSync(file, 'utf-8')
                        .toString();
                }
                catch (e) {
                    return resolveFile();
                }
                // get the file extension
                const extension = __path
                    .extname(file)
                    .replace(/^\./, '');
                // get the appropriate formatter for this extension
                const formatter = SCodeFormatter.getFormatterForExtension(extension);
                if (!formatter) {
                    emit('log', {
                        type: __SLog.TYPE_WARN,
                        value: `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                    });
                    // resole file
                    resolveFile();
                }
                else {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
                        __fs.writeFileSync(file, result.code, 'utf-8');
                        emit('log', {
                            clear: 1,
                            type: __SLog.TYPE_INFO,
                            value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                    }
                    catch (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sd0JBQXdCLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBd0RwRyxNQUFNLGNBQWUsU0FBUSxRQUFRO0lBMkZqQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSw2QkFBNkIsRUFBRSxJQUFJO1NBQ3RDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBeEdEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQW1DO1FBQ3hELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsMERBQTBELENBQzdELENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtH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