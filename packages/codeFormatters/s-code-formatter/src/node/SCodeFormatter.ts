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

/**
 * @name                SCodeFormatter
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
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

export interface ISCodeFormatterLogSettings {
    summary: boolean;
    verbose: boolean;
}

export interface ISCodeFormatterSettings {
    timeoutBetweenSameFileProcess: number;
    log: Partial<ISCodeFormatterLogSettings>;
}

export interface ISCodeFormatterFormatParams {
    glob: string;
    inDir: string;
    watch: boolean;
    formatInitial: boolean;
}

export type ISCodeFormatterFormatResult = [];

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
    languagesToExtensionsMap?: Record<string, string>;
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
                ) ||
                (<ISCodeFormatterFormatter>formatter)
                    .languagesToExtensionsMap?.[extension]
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
                    log: {
                        summary: true,
                        verbose: __SEnv.is('verbose'),
                    },
                },
                settings ?? {},
            ),
        );
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
    formatInline(
        code: string,
        language: string,
        settings?: Partial<ISCodeFormatterSettings>,
    ): Promise<String> {
        return new Promise(async (resolve) => {
            // write the file in tmp folder
            const tmpFilePath = `${__systemTmpDir()}/s-code-formatter/${__uniqid()}.${language}`;
            __writeFileSync(tmpFilePath, code);

            // format the code
            const formatResult = await this.format(
                {
                    glob: __path.basename(tmpFilePath),
                    inDir: __path.dirname(tmpFilePath),
                    watch: false,
                },
                settings,
            );

            // resolve with formatted code
            // @ts-ignore
            resolve(formatResult[0].content);
        });
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
        return new Promise(async (resolve) => {
            const finalSettings: ISCodeFormatterSettings = __deepMerge(
                this.settings,
                settings,
            );
            const finalParams: ISCodeFormatterFormatParams =
                __SCodeFormatterFormatParamsInterface.apply(params);

            const formattedFiles = [];

            let finalGlob = finalParams.glob;

            const handledExtensions = this.constructor.getHandledExtensions();
            if (finalParams.glob.match(/\/\*$/)) {
                finalGlob += `.{${handledExtensions.join(',')}}`;
            }

            if (finalSettings.log.summary) {
                console.log(
                    `<yellow>○</yellow> Glob              : <yellow>${finalGlob}</yellow>`,
                );
                console.log(
                    `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(
                        `${__packageRootDir()}/`,
                        '',
                    )}</cyan>`,
                );
                console.log(
                    `<yellow>○</yellow> Watch             : ${
                        finalParams.watch
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
                );
                console.log(
                    `<yellow>○</yellow> Format initial    : ${
                        finalParams.formatInitial
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
                );

                if (finalParams.watch) {
                    console.log(
                        `<yellow>[watch]</yellow> Watching for file changes...`,
                    );
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
            const savedStack: string[] = [];

            // listen for files change and add
            filesPromise.on(
                'add,change',
                async ({ file: filePath, resolve: resolveFile }) => {
                    // avoid to process in loop the same file saved over and over
                    const savedFileIdx = savedStack.indexOf(filePath);
                    if (savedFileIdx !== -1) {
                        return;
                    }

                    // get the file extension
                    let extension = __path.extname(filePath).replace(/^\./, '');

                    // get the relative to the package root file path
                    let relFilePath = __path.relative(
                        __packageRootDir(),
                        filePath,
                    );

                    // get the formatter for this file
                    const formatter =
                        SCodeFormatter.getFormatterForExtension(extension);

                    const duration = new __SDuration();

                    let code;

                    // grab the file content
                    try {
                        code = __fs.readFileSync(filePath, 'utf-8').toString();
                    } catch (e) {
                        return resolveFile();
                    }

                    // get the appropriate formatter for this extension
                    if (!formatter) {
                        console.log(
                            `<yellow>[format]</yellow> No formatter registered for the "<magenta>.${extension}</magenta>" files`,
                        );

                        // add in stach
                        formattedFiles.push(__SFile.new(filePath));

                        // resolve file
                        resolveFile();
                    } else {
                        console.verbose?.(
                            `<yellow>[format]</yellow> Formatting file "<cyan>${relFilePath}</cyan>"`,
                        );
                        try {
                            // apply the formatter on the file content
                            const result = await formatter.format(code, {
                                filePath: filePath,
                                extension,
                            });

                            // avoid process the same file more than 1x by second
                            // this is to avoid issues with multiple formatt process that might
                            // save each in their corner and enter in a loop of formatting...
                            savedStack.push(filePath);
                            setTimeout(() => {
                                const savedFileIdx =
                                    savedStack.indexOf(filePath);
                                if (savedFileIdx !== -1) {
                                    // remove the file for next process
                                    savedStack.splice(savedFileIdx, 1);
                                }
                            }, finalSettings.timeoutBetweenSameFileProcess);

                            // write file back with formatted code
                            __fs.writeFileSync(filePath, result.code, 'utf-8');

                            // add in stach
                            formattedFiles.push(__SFile.new(filePath));

                            console.verbose?.({
                                clear: 1,
                                type: __SLog.TYPE_INFO,
                                value: `<green>[format]</green> File "<cyan>${relFilePath}</cyan>" formatted <green>successfully</green> in <yellow>${
                                    duration.end().formatedDuration
                                }</yellow>`,
                            });
                        } catch (e) {
                            console.error(e);
                        }
                        // resole file
                        resolveFile();
                    }
                },
            );
        });
    }
}

SCodeFormatter.registerFormatter(__SCodeFormatterPrettier);

export default SCodeFormatter;
