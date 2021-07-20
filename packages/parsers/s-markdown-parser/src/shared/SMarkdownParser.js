import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SMarkdownParserSettingsInterface from './interface/SMarkdownParserSettingsInterface';
import __marked from 'marked';
// @ts-ignore
class SMarkdownParser extends __SClass {
    /**
     * @name            registerExtension
     * @type             Function
     * @static
     *
     * This static method allows you to register
     */
    /**
     * @name        markdownParserSettings
     * @type        ISMarkdownParserSettings
     * @get
     *
     * Access the markdown parser settings
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get markdownParserSettings() {
        return this._settings.markdownParser;
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
            markdownParser: Object.assign({}, __SMarkdownParserSettingsInterface.defaults())
        }, settings));
    }
    /**
     * @name          parse
     * @type          Function
     *
     * This method takes a markdown string input and transform it into
     *
     * @param         {String}            markdown            The markdown string you want to parse
     * @return      {MarkedTokens}                            A marked tokens result that include all the custom markdown features added by this parser
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    parse(markdown) {
        const tokens = __marked.lexer(markdown);
        return tokens;
    }
}
export default SMarkdownParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU01hcmtkb3duUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sa0NBQWtDLE1BQU0sOENBQThDLENBQUM7QUFDOUYsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBa0M5QixhQUFhO0FBQ2IsTUFBTSxlQUFnQixTQUFRLFFBQVE7SUFFbkM7Ozs7OztPQU1HO0lBRUo7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxRQUF1QztRQUV2QyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLGNBQWMsb0JBQ1Qsa0NBQWtDLENBQUMsUUFBUSxFQUFFLENBQ2pEO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLFFBQWdCO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBRUQsZUFBZSxlQUFlLENBQUMifQ==