"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInput_1 = __importDefault(require("../form/SInput"));
const SBlessedPopup_1 = __importDefault(require("./SBlessedPopup"));
module.exports = class SBlessedInputPopup extends SBlessedPopup_1.default {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0UG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW5wdXRQb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHVFQUFpRDtBQUNqRCw0REFBc0M7QUFDdEMsb0VBQThDO0FBMkI5QyxpQkFBUyxNQUFNLGtCQUFtQixTQUFRLHVCQUFlO0lBQ3ZEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxHQUFHO1lBQ2YsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFBRSxPQUFPO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDSixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFDIn0=