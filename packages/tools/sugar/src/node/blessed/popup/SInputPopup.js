"use strict";
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
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @example       js
 * import SBlessedInputPopup from '@coffeekraken/sugar/node/blessed/popup/SBlessedInputPopup';
 * new SBlessedInputPopup({});
 *
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
