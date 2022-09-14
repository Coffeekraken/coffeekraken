import __SClass from '@coffeekraken/s-class';
import __SCodeFormatterPrettier from '@coffeekraken/s-code-formatter-prettier';
import __SDuration from '@coffeekraken/s-duration';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __unique } from '@coffeekraken/sugar/array';
import { __getFiles } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import __SCodeFormatterFormatParamsInterface from './interface/SCodeFormatterFormatParamsInterface';

/**
 * @name                SCodeFormatter
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This represent the main code formatter class that allows you to format code like js, css, etc...
 * All the code formatters have to be implemented by exporting an object of type ISCodeFormatterFormatter.
 *
 * @param           {Object}                        [settings={}]       Specify an object of settings to configure your formatting process
 *
 * @setting         {Number}                [timeoutBetweenSameFileProcess=1000]            Specify a timeout between 2 same file processes to avoid loop of formatting
 *
 * @example         js
 * import __SCodeFormatter from '@coffeekraken/s-code-formatter';
 * const formatter = new __SCodeFormatter();
 * await formatter.format('/my/cool/file.js');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISCodeFormatterSettings {
    timeoutBetweenSameFileProcess: number;
}

export interface ISCodeFormatterFormatParams {
    glob: string;
    inDir: string;
    watch: boolean;
    formatInitial: boolean;
}

export interface ISCodeFormatterFormatResult {}

export interface ISCodeFormatterFormatterMetas {
    filePath: string;
    extension: string;
}

export interface ISCodeFormatterFormatterFormatResult {
    code: string;
}

export interface ISCodeFormatterFormatter {
    id: string;
    extensions: string[];
    format(
        code: string,
        metas: ISCodeFormatterFormatterMetas,
    ): ISCodeFormatterFormatterFormatResult;
}

class SCodeFormatter extends __SClass {
    /**
     * Store the registered formatters
     */
    private static _registeredFormatters = {};

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
    static registerFormatter(formatter: ISCodeFormatterFormatter): void {
        // check formatter validity
        if (!formatter.id) {
            throw new Error(
                `Sorry but a code formatter MUST have an "id" property...`,
            );
        }
        if (!formatter.extensions) {
            throw new Error(
                `Sorry but a code formatter MUST have an "extensions" property that list which files it handle...`,
            );
        }
        // check if already exists
        if (SCodeFormatter._registeredFormatters[formatter.id]) {
            throw new Error(
                `Sorry but a code formatter with the id "${formatter.id}" has already been registered...`,
            );
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
    static getHandledExtensions(): string[] {
        let exts: string[] = [];
        for (let [id, formatter] of Object.entries(
            SCodeFormatter._registeredFormatters,
        )) {
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
    static getFormatterForExtension(
        extension: string,
    ): ISCodeFormatterFormatter {
        for (let [id, formatter] of Object.entries(
            SCodeFormatter._registeredFormatters,
        )) {
            if (
                (<ISCodeFormatterFormatter>formatter).extensions.includes(
                    extension,
                )
            ) {
                return <ISCodeFormatterFormatter>formatter;
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
    constructor(settings?: Partial<ISCodeFormatterSettings>) {
        super(
            __deepMerge(
                {
                    timeoutBetweenSameFileProcess: 1000,
                },
                settings ?? {},
            ),
        );
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
    format(
        params: any = {},
        settings: any = {},
    ): Promise<ISCodeFormatterFormatResult> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const finalSettings: ISCodeFormatterSettings = __deepMerge(
                    this.settings,
                    settings,
                );
                const finalParams: ISCodeFormatterFormatParams =
                    __SCodeFormatterFormatParamsInterface.apply(params);

                let finalGlob = finalParams.glob;

                const handledExtensions =
                    this.constructor.getHandledExtensions();
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
                    value: `<yellow>○</yellow> Watch             : ${
                        finalParams.watch
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Format initial    : ${
                        finalParams.formatInitial
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
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
                const savedStack: string[] = [];

                // listen for files change and add
                filesPromise.on(
                    'add,change',
                    async ({ file, resolve: resolveFile }) => {
                        // avoid to process in loop the same file saved over and over
                        const savedFileIdx = savedStack.indexOf(file);
                        if (savedFileIdx !== -1) {
                            return;
                        }

                        const relFilePath = __path.relative(
                            __packageRootDir(),
                            file,
                        );

                        const duration = new __SDuration();

                        let code;

                        // grab the file content
                        try {
                            code = __fs.readFileSync(file, 'utf-8').toString();
                        } catch (e) {
                            return resolveFile();
                        }

                        // get the file extension
                        const extension = __path
                            .extname(file)
                            .replace(/^\./, '');
                        // get the appropriate formatter for this extension
                        const formatter =
                            SCodeFormatter.getFormatterForExtension(extension);
                        if (!formatter) {
                            emit('log', {
                                type: __SLog.TYPE_WARN,
                                value: `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                            });
                            // resole file
                            resolveFile();
                        } else {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`,
                            });
                            try {
                                // apply the formatter on the file content
                                const result = await formatter.format(code, {
                                    filePath: file,
                                    extension,
                                });

                                // avoid process the same file more than 1x by second
                                // this is to avoid issues with multiple formatt process that might
                                // save each in their corner and enter in a loop of formatting...
                                savedStack.push(file);
                                setTimeout(() => {
                                    const savedFileIdx =
                                        savedStack.indexOf(file);
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
                                    value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${
                                        duration.end().formatedDuration
                                    }</yellow>`,
                                });
                            } catch (e) {
                                emit('log', {
                                    type: __SLog.TYPE_ERROR,
                                    value: e.toString(),
                                });
                            }
                            // resole file
                            resolveFile();
                        }
                    },
                );
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}

SCodeFormatter.registerFormatter(__SCodeFormatterPrettier);

export default SCodeFormatter;
