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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __fs from 'fs';
import __marked from 'marked';
import __sCodeExampleToken from './tokens/sCodeExampleToken';
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
     * @name              registerToken
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
    static registerToken(token) {
        // @ts-ignore
        this._registeredTokens.push(token);
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // handle input
            let src = params.input, from = undefined;
            try {
                src = __fs.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            }
            catch (e) { }
            emit('log', {
                value: `<yellow>[build]</yellow> Starting markdown Build`
            });
            if (from) {
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>${__path.relative(process.cwd(), from)}</cyan>`
                });
            }
            else {
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>inline string</cyan>`
                });
            }
            if (params.output) {
                emit('log', {
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`
                });
            }
            // @ts-ignore
            let currentTransformedString = src;
            this.constructor._registeredTokens.forEach(tokenFn => {
                const tokenObj = tokenFn();
                const matches = tokenObj.extract(currentTransformedString);
                if (!matches)
                    return;
                matches.forEach(match => {
                    const renderedStr = tokenObj.render(match, params.target);
                    if (!renderedStr)
                        return;
                    currentTransformedString = currentTransformedString.replace(match.raw, renderedStr);
                });
            });
            // marked if html is the target
            if (params.target === 'html') {
                currentTransformedString = __marked(currentTransformedString, {});
                // currentTransformedString = __unescapeHtml(currentTransformedString);
            }
            if (params.output) {
                __writeFileSync(params.output, currentTransformedString);
                const file = new __SFile(params.output);
                emit('log', {
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                });
            }
            const res = {
                outputFile: params.output ? __SFile.new(params.output) : undefined,
                code: currentTransformedString
            };
            if (from)
                res.inputFile = __SFile.new(from);
            resolve(res);
        }), {
            metas: {
                id: this.constructor.name
            }
        });
    }
}
SMarkdownBuilder._registeredTokens = [];
SMarkdownBuilder.registerToken(__sCodeExampleToken);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHOUIsT0FBTyxtQkFBbUIsTUFBTSw0QkFBNEIsQ0FBQztBQW9FN0QsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBb0NwRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBaUQ7UUFDekQsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNkLGVBQWUsb0JBQ1IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUMzQztTQUNKLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBL0NEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBdUM7UUFDeEQsYUFBYTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksdUJBQXVCO1FBQ3ZCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQW1CRDs7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