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
// @ts-ignore
class SMarkdownRenderer extends __SClass {
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
    render() {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        }), {
            id: 'SMarkdownRendererRender'
        });
    }
}
export default SMarkdownRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWFya2Rvd25SZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLG9DQUFvQyxNQUFNLGdEQUFnRCxDQUFDO0FBZ0ZsRyxhQUFhO0FBQ2IsTUFBTSxpQkFBa0IsU0FBUSxRQUFRO0lBRXRDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksd0JBQXdCO1FBQzFCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxRQUF5QztRQUV6QyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLGdCQUFnQixvQkFDWCxvQ0FBb0MsQ0FBQyxRQUFRLEVBQUUsQ0FDbkQ7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBRTlCLENBQUMsQ0FBQSxFQUNEO1lBQ0UsRUFBRSxFQUFFLHlCQUF5QjtTQUM5QixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxlQUFlLGlCQUFpQixDQUFDIn0=