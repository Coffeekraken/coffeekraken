var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import __handlebars from 'handlebars';
import __SMarkdownBuilderSCodeExampleHandlebarsHelper from './helpers/sCodeExampleHandlebarsHelper';
import __SMarkdownBuilderShieldsioHandlebarsHelper from './helpers/shieldsioHandlebarsHelper';
export default class SMarkdownBuilder extends __SBuilder {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            markdownBuilder: Object.assign({}, __SSugarConfig.get('markdownBuilder'))
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
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
    static registerHelper(name, helper) {
        // @ts-ignore
        this._registeredHelpers.push({
            name,
            helper
        });
    }
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
    get markdownBuilderSettings() {
        return this._settings.markdownBuilder;
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
    _build(params) {
        if (params.preset && params.preset.length) {
            return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    emit('log', {
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`
                    });
                    const newParams = __deepMerge(__SMarkdownBuilderBuildParamsInterface.defaults(), __SSugarConfig.get(`markdownBuilder.presets.${preset}`));
                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = yield buildPromise;
                }
                resolve(buildedPresets);
            }));
        }
        else {
            return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                const handlebars = __handlebars.create();
                const buildedFiles = [];
                // @ts-ignore
                this.constructor._registeredHelpers.forEach(helperObj => {
                    handlebars.registerHelper(helperObj.name, helperObj.helper({
                        target: params.target
                    }));
                });
                const sources = [];
                const inDir = params.inDir;
                let path = `${inDir}/${params.glob}`;
                const sourceObj = {
                    inputStr: '',
                    outputStr: '',
                    files: [],
                    inDir,
                    outDir: params.outDir
                };
                if (__fs.existsSync(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                }
                else if (__SGlob.isGlob(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolve(path, {
                        SFile: false
                    });
                }
                else {
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
                const viewData = Object.assign({}, __SSugarConfig.get('.'));
                for (let i = 0; i < sources.length; i++) {
                    const sourceObj = sources[i];
                    if (!sourceObj.files.length)
                        continue;
                    for (let j = 0; j < sourceObj.files.length; j++) {
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
                        const res = {
                            inputFile: __SFile.new(filePath),
                            outputFile: params.save ? __SFile.new(buildObj.output) : undefined,
                            code: currentTransformedString
                        };
                        buildedFiles.push(res);
                    }
                }
                resolve(buildedFiles);
            }), {
                metas: {
                    id: this.constructor.name
                }
            });
        }
    }
}
SMarkdownBuilder._registeredHelpers = [];
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
SMarkdownBuilder.marked = __marked;
SMarkdownBuilder.registerHelper('s-code-example', __SMarkdownBuilderSCodeExampleHandlebarsHelper);
SMarkdownBuilder.registerHelper('shieldsio', __SMarkdownBuilderShieldsioHandlebarsHelper);
// SMarkdownBuilder.registerHelper(__sCodeExampleToken);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLHNDQUFzQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUU5QixPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyw4Q0FBOEMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRyxPQUFPLDJDQUEyQyxNQUFNLHFDQUFxQyxDQUFDO0FBMkU5RixNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUFtRHBEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFpRDtRQUN6RCxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ2QsZUFBZSxvQkFDUixjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQzNDO1NBQ0osRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBR3hCLENBQUM7SUFoRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFZLEVBQUUsTUFBd0M7UUFDeEUsYUFBYTtRQUNiLElBQUksQ0FB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