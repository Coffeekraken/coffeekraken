import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __fs from 'fs';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __marked from 'marked';
import __unescapeHtml from '@coffeekraken/sugar/shared/html/unescapeHtml';
import __handlebars from 'handlebars';
import __SMarkdownBuilderSCodeExampleHandlebarsHelper from './helpers/sCodeExampleHandlebarsHelper';
import __SMarkdownBuilderShieldsioHandlebarsHelper from './helpers/shieldsioHandlebarsHelper';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';

import __sCodeExampleToken from './tokens/sCodeExampleToken';

/**
 * @name                SMarkdownBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @platform            ts
 * @status              beta
 * 
 * This class represent the markdown builder that helps you create and maintain multiple README for example
 * with a common style and some common sections like footer, etc...
 * 
 * @param           {ISMarkdownBuilderCtorSettings}          [settings={}]           Some settings to configure your builder instance
 * 
 * @example         js
 * import SMarkdownBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new SMarkdownBuilder({
 *      markdownBuilder: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      input: 'my-cool-file.md',
 *      output: 'my/cool/file-output.md'
 * });
 * 
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISMarkdownBuilderSettings {
}

export interface ISMarkdownBuilderCtorSettings {
    markdownBuilder: Partial<ISMarkdownBuilderSettings>
}

export interface ISMarkdownBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    code: string;
}

export interface ISMarkdownBuilderTokenExtractResult {
    raw: string;
    [key: string]: any;
}

export interface ISMarkdownBuilderTokenExtractFn {
    (source: string): ISMarkdownBuilderTokenExtractResult[];
}
export interface ISMarkdownBuilderTokenRenderFn {
    (params: any, target: 'html' | 'markdown'): string;
}

export interface ISMarkdownBuilderToken {
    extract: ISMarkdownBuilderTokenExtractFn;
    render: ISMarkdownBuilderTokenRenderFn;
}

export interface ISMarkdownBuilderBuildParams {
    glob: string;
    inDir: string;
    outDir: string;
    save: boolean;
    target: 'html' | 'markdown',
    preset: string[];
}

export default class SMarkdownBuilder extends __SBuilder {

    static _registeredHelpers: any = [];

    /**
     * @name              registerHelper
     * @type                Function
     * @static
     * 
     * This static method allows you to register a new token function that returns an ISMarkdownBuilderToken object
     * used to transform your passed markdown
     * 
     * @param           {Function<ISMarkdownBuilderToken>>}         token           A token function that returns an ISMarkdownBuilderToken object
     * 
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerHelper(name: string, helper: Function<ISMarkdownBuilderToken>): void {
        // @ts-ignore
        this._registeredHelpers.push({
            name,
            helper
        });
    }

    /**
     * @name            marked
     * @type            Object
     * @static
     * 
     * Access the marked object through this property
     * 
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static marked = __marked;

    /**
     * @name            markdownBuilderSettings
     * @type            ISMarkdownBuilderSettings
     * @get
     * 
     * Access the postcss builder settings
     * 
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get markdownBuilderSettings(): ISMarkdownBuilderSettings {
        return (<any>this)._settings.markdownBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     * 
     * Constructor
     * 
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings?: Partial<ISMarkdownBuilderCtorSettings>) {
        super(__deepMerge({
            markdownBuilder: {
                ...__SSugarConfig.get('markdownBuilder')
            }
        }, settings ?? {}));


    }

    /**
     * @name            _build
     * @type            Function
     * @async
     * 
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     * 
     * @param       {Partial<ISMarkdownBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     * 
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params: ISMarkdownBuilderBuildParams): Promise<ISMarkdownBuilderResult[]> {

        if (params.preset && params.preset.length) {

            return new __SPromise(async ({resolve, reject, emit, pipe}) => {

                const buildedPresets = {};

                for (let i=0; i<params.preset.length; i++) {
                    const preset = params.preset[i];
                    
                    emit('log', {
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`
                    });

                    const newParams = <ISMarkdownBuilderBuildParams>__deepMerge(
                        __SMarkdownBuilderBuildParamsInterface.defaults(),
                        __SSugarConfig.get(`markdownBuilder.presets.${preset}`)
                    );

                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = await buildPromise;

                }

                resolve(buildedPresets);

            });

        } else {

            return new __SPromise(async ({resolve, reject, emit}) => {

                const handlebars = __handlebars.create();

                const buildedFiles: ISMarkdownBuilderResult[] = [];

                // @ts-ignore
                this.constructor._registeredHelpers.forEach(helperObj => {
                    handlebars.registerHelper(helperObj.name, helperObj.helper({
                        target: params.target
                    }));
                });

                const sources: any[] = [];

                const inDir = params.inDir;
                let path = `${inDir}/${params.glob}`;
                const sourceObj = {
                    inputStr: '',
                    outputStr: '',
                    files: [],
                    inDir,
                    outDir: params.outDir
                }
                if (__fs.existsSync(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                } else if (__SGlob.isGlob(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolve(path, {
                        SFile: false
                    });
                } else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outDir) {
                    sourceObj.outputStr = __path.relative(process.cwd(), sourceObj.outDir) || '.';
                }
                sources.push(sourceObj);

                emit('log', {
                    value: `<yellow>[build]</yellow> Starting markdown Build`
                });

                const inputStrArray = sources.map(sourceObj => sourceObj.inputStr);
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>${inputStrArray.join(', ')}</cyan>`
                });

                const outputStrArray = sources.map(sourceObj => sourceObj.outputStr);
                if (outputStrArray.length) {
                    emit('log', {
                        value: `<yellow>○</yellow> Output      : <cyan>${outputStrArray.join(',')}</cyan>`
                    });
                }

                // take some datas like packagejson, etc...
                const viewData = {
                    ...__SSugarConfig.get('.')
                };

                for (let i=0; i<sources.length; i++) {

                    const sourceObj = sources[i];

                    if (!sourceObj.files.length) continue;

                    for (let j=0; j<sourceObj.files.length; j++) {

                        const filePath = sourceObj.files[j];

                        const buildObj = {
                            data: __fs.readFileSync(filePath, 'utf8').toString(),
                            output: `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`
                        };

                        let currentTransformedString = buildObj.data;

                        const tplFn = handlebars.compile(currentTransformedString);
                        currentTransformedString = tplFn(viewData);

                        // marked if html is the target
                        if (params.target === 'html') {
                            currentTransformedString = __marked(currentTransformedString, {});
                        }

                        if (params.save) {
                            __writeFileSync(buildObj.output, currentTransformedString);
                            const file = new __SFile(buildObj.output);
                            emit('log', {
                                value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                            });
                        }

                        const res: ISMarkdownBuilderResult = {
                            inputFile: __SFile.new(filePath),
                            outputFile: params.save ? __SFile.new(buildObj.output) : undefined,
                            code: currentTransformedString
                        };

                        buildedFiles.push(res);

                    }

                }

                resolve(buildedFiles);
            }, {
                metas: {
                    id: this.constructor.name
                }
            });
        }
    }

}

SMarkdownBuilder.registerHelper('s-code-example', __SMarkdownBuilderSCodeExampleHandlebarsHelper);
SMarkdownBuilder.registerHelper('shieldsio', __SMarkdownBuilderShieldsioHandlebarsHelper);

// SMarkdownBuilder.registerHelper(__sCodeExampleToken);