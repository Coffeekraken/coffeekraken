"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInput_1 = __importDefault(require("../form/SInput"));
const SBlessedPopup_1 = __importDefault(require("./SBlessedPopup"));
/**
 * @name                  SBlessedInputPopup
 * @namespace           sugar.node.blessed.popup
 * @type                  Class
 * @extends               SBlessedPopup
 * @status              wip
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedInputPopup from '@coffeekraken/sugar/node/blessed/popup/SBlessedInputPopup';
 * new SBlessedInputPopup({});
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBlessedInputPopup extends SBlessedPopup_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            closeDelay: 500,
            $input: {}
        }, settings));
        // create an input
        this.$input = new SInput_1.default(this._settings.$input);
        this.on('detach', () => {
            if (!this.$input.promise.isPending())
                return;
            this.$input.promise.cancel();
        });
        this.$input.promise.on('resolve', (value) => {
            setTimeout(() => {
                this.parent.remove(this);
                this.promise.resolve(value);
            }, this._settings.closeDelay);
        });
        this.append(this.$input);
    }
    update() {
        super.update();
        this.height = this.$content.getScrollHeight() + 5;
    }
}
exports.default = SBlessedInputPopup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0UG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9ibGVzc2VkL3BvcHVwL1NJbnB1dFBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHVFQUFpRDtBQUNqRCw0REFBc0M7QUFDdEMsb0VBQThDO0FBRzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQXFCLGtCQUFtQixTQUFRLHVCQUFlO0lBQzdEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxHQUFHO1lBQ2YsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDSixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQTNDRCxxQ0EyQ0MifQ==