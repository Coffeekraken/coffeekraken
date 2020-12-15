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
//# sourceMappingURL=SInputPopup.js.map