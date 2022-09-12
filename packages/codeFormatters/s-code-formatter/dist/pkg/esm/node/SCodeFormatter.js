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
import { __getFiles } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
                const relFilePath = __path.relative(__packageRootDir(), file);
                const duration = new __SDuration();
                let code;
                // grab the file content
                try {
                    code = __fs.readFileSync(file, 'utf-8').toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sd0JBQXdCLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxxQ0FBcUMsTUFBTSxpREFBaUQsQ0FBQztBQXdEcEcsTUFBTSxjQUFlLFNBQVEsUUFBUTtJQTJGakM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksNkJBQTZCLEVBQUUsSUFBSTtTQUN0QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXhHRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFtQztRQUN4RCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUNYLDBEQUEwRCxDQUM3RCxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUN2QixNQUFN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