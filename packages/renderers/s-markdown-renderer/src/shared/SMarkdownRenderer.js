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
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SMarkdownRendererSettingsInterface from './interface/SMarkdownRendererSettingsInterface';
import __marked from 'marked';
import __sCodeExampleMarkedExtension from './extensions/sCodeExampleMarkedExtension';
import __sRepoStateMarkedExtension from './extensions/sRepoStateMarkedExtension';
// @ts-ignore
class SMarkdownRenderer extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        // save the settings
        super(__deepMerge({
            markdownRenderer: Object.assign({}, __SMarkdownRendererSettingsInterface.defaults())
        }, settings));
        __marked.use({
            extensions: [
                __sCodeExampleMarkedExtension(),
                __sRepoStateMarkedExtension()
            ]
        });
    }
    /**
     * @name        markdownRendererSettings
     * @type        ISMarkdownRendererSettings
     * @get
     *
     * Access the markdown renderer settings
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get markdownRendererSettings() {
        return this._settings.markdownRenderer;
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * This method allows you to render your actual markdown into different output like html and more to come depending on needs
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(markdown) {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            resolve(__marked(markdown));
        }), {
            id: 'SMarkdownRendererRender'
        });
    }
}
/**
 * @name        marked
 * @type        Any
 * @static
 *
 * Access the marked object to register extensions, etc...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SMarkdownRenderer.marked = __marked;
export default SMarkdownRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWFya2Rvd25SZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLG9DQUFvQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2xHLE9BQU8sUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUU5QixPQUFPLDZCQUE2QixNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sMkJBQTJCLE1BQU0sd0NBQXdDLENBQUM7QUE0RWpGLGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLFFBQVE7SUE0QnRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsUUFBeUM7UUFFekMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxnQkFBZ0Isb0JBQ1gsb0NBQW9DLENBQUMsUUFBUSxFQUFFLENBQ25EO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNYLFVBQVUsRUFBRTtnQkFDViw2QkFBNkIsRUFBRTtnQkFDL0IsMkJBQTJCLEVBQUU7YUFDOUI7U0FDRixDQUFDLENBQUM7SUFFTCxDQUFDO0lBOUNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksd0JBQXdCO1FBQzFCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNoRCxDQUFDO0lBb0NEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLFFBQWdCO1FBQ3JCLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUU1QixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFOUIsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxFQUFFLEVBQUUseUJBQXlCO1NBQzlCLENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBbkZEOzs7Ozs7Ozs7R0FTRztBQUNJLHdCQUFNLEdBQUcsUUFBUSxDQUFDO0FBNEUzQixlQUFlLGlCQUFpQixDQUFDIn0=