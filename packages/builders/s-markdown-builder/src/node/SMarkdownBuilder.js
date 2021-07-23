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
import __handlebars from 'handlebars';
import __SMarkdownBuilderSCodeExampleHandlebarsHelper from './helpers/sCodeExampleHandlebarsHelper';
import __SMarkdownBuilderShieldsioHandlebarsHelper from './helpers/shieldsioHandlebarsHelper';
import __packageJson from '@coffeekraken/sugar/node/package/json';
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const handlebars = __handlebars.create();
            this.constructor._registeredHelpers.forEach(helperObj => {
                handlebars.registerHelper(helperObj.name, helperObj.helper({
                    target: params.target
                }));
            });
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
            let currentTransformedString = src;
            // take some datas like packagejson, etc...
            const data = Object.assign({ packageJson: __packageJson() }, __SSugarConfig.get('.'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sOENBQThDLE1BQU0sd0NBQXdDLENBQUM7QUFDcEcsT0FBTywyQ0FBMkMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RixPQUFPLGFBQWEsTUFBTSx1Q0FBdUMsQ0FBQztBQXNFbEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBbURwRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBaUQ7UUFDekQsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNkLGVBQWUsb0JBQ1IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUMzQztTQUNKLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBOUREOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBWSxFQUFFLE1BQXdDO1FBQ3hFLGFBQWE7UUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQ3pCLElBQUk7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