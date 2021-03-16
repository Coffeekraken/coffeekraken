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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NlYXJjaFJlc3VsdEl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9zZWFyY2gvU1NlYXJjaFJlc3VsdEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQThDO0FBVTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFxQixpQkFBaUI7SUE2Q3BDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQXJEckQ7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWQ7Ozs7Ozs7O1dBUUc7UUFDSCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVwQjs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7UUFZYixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU07UUFDSixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7U0FDN0IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXBIRCxvQ0FvSEMifQ==