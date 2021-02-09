"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name              SSearchResultItem
 * @namespace           sugar.node.search
 * @type              Class
 * @status              wip
 *
 * This class represent a search result with all his fields, etc...
 *
 * @param      {String}       source      The source to generate the docMap item. Can be a simple string or a file path
 * @param      {Object}       [settings={}]     A settings object with these properties availble:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SSearchResultItem from '@coffeekraken/sugar/node/doc/SSearchResultItem';
 * const myDocMapItem = new SSearchResultItem('something/cool.js');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSearchResultItem {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(title, description, action, settings = {}) {
        /**
         * @name        _settings
         * @type        Object
         * @private
         *
         * Store the settings of the instance
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name        _title
         * @type        String
         * @private
         *
         * Store the search result title
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._title = null;
        /**
         * @name        _description
         * @type        String
         * @private
         *
         * Store the search result description
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._description = null;
        /**
         * @name        _action
         * @type        String
         * @private
         *
         * Store the search result action object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._action = null;
        // save settings
        this._settings = deepMerge_1.default({}, settings);
        this._title = title;
        this._description = description;
        this._action = action;
    }
    /**
     * @name        title
     * @type        String
     * @get
     *
     * Access the title property
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get title() {
        return this._title;
    }
    /**
     * @name        description
     * @type        String
     * @get
     *
     * Access the description property
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get description() {
        return this._description;
    }
    /**
     * @name        action
     * @type        String
     * @get
     *
     * Access the action property
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get action() {
        return this._action;
    }
    /**
     * @name            toJson
     * @type            Function
     *
     * This method return a JSON version of the docMap item
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toJson() {
        return {
            title: this.title,
            description: this.description,
            action: this.action.toJson()
        };
    }
}
exports.default = SSearchResultItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NlYXJjaFJlc3VsdEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2VhcmNoUmVzdWx0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvRUFBOEM7QUFVOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQXFCLGlCQUFpQjtJQTZDcEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBckRyRDs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFZDs7Ozs7Ozs7V0FRRztRQUNILGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCOzs7Ozs7OztXQVFHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQVliLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTTtRQUNKLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtTQUM3QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcEhELG9DQW9IQyJ9