import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __fs from 'fs';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __marked from 'marked';
import __unescapeHtml from '@coffeekraken/sugar/shared/html/unescapeHtml';
import __handlebars from 'handlebars';
import __SMarkdownBuilderSCodeExampleHandlebarsHelper from './helpers/sCodeExampleHandlebarsHelper';
import __SMarkdownBuilderShieldsioHandlebarsHelper from './helpers/shieldsioHandlebarsHelper';
import __packageJson from '@coffeekraken/sugar/node/package/json';

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
    input: string;
    output: string;
    target: 'html' | 'markdown'
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
    _build(params: ISMarkdownBuilderBuildParams): Promise<ISMarkdownBuilderResult> {
        return new __SPromise(async ({resolve, reject, emit}) => {

            const handlebars = __handlebars.create();

            this.constructor._registeredHelpers.forEach(helperObj => {
                handlebars.registerHelper(helperObj.name, helperObj.helper({
                    target: params.target
                }));
            });

            // handle input
            let src = params.input,
                from: any = undefined;
            try {
                src = __fs.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            } catch(e) {}

            emit('log', {
                value: `<yellow>[build]</yellow> Starting markdown Build`
            });
            if (from) {
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>${__path.relative(process.cwd(), from)}</cyan>`
                });
            } else {
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>inline string</cyan>`
                });
            }
            if (params.output) {
                emit('log', {
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`
                });
            }

            let currentTransformedString = src;

            // take some datas like packagejson, etc...
            const data = {
                packageJson: __packageJson(),
                ...__SSugarConfig.get('.')
            };

            const tplFn = handlebars.compile(currentTransformedString);
            currentTransformedString = tplFn(data);

            // @ts-ignore
//             let currentTransformedString = src;
//             this.constructor._registeredHelpers.forEach(tokenFn => {

//                 const tokenObj = tokenFn();
//                 const matches = tokenObj.extract(currentTransformedString);

//                 if (!matches) return;

//                 matches.forEach(match => {
//                     const renderedStr = tokenObj.render(match, params.target);
//                     if (!renderedStr) return;
//                     currentTransformedString = currentTransformedString.replace(match.raw, renderedStr);
//                 });
// e

//             });

//             // marked if html is the target
            if (params.target === 'html') {
                currentTransformedString = __marked(currentTransformedString, {});
            }

            if (params.output) {
                __writeFileSync(params.output, currentTransformedString);
                const file = new __SFile(params.output);
                emit('log', {
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                });
            }

            const res: ISMarkdownBuilderResult = {
                outputFile: params.output ? __SFile.new(params.output) : undefined,
                code: currentTransformedString
            };

            if (from) res.inputFile = __SFile.new(from);

            resolve(res);
        }, {
            metas: {
                id: this.constructor.name
            }
        });
    }

}

SMarkdownBuilder.registerHelper('s-code-example', __SMarkdownBuilderSCodeExampleHandlebarsHelper);
SMarkdownBuilder.registerHelper('shieldsio', __SMarkdownBuilderShieldsioHandlebarsHelper);

// SMarkdownBuilder.registerHelper(__sCodeExampleToken);