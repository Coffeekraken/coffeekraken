"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EightBit = void 0;
const hex_js_1 = require("./hex.js");
const inspect = Symbol.for('nodejs.util.inspect.custom');
class EightBit {
    constructor(value) {
        this.value = Number(value);
    }
    /** Returns the current value, e.g. 255. */
    valueOf() {
        return this.value;
    }
    /** Returns a formatted representation of the current value, e.g. "EightBit(255)". */
    [inspect]() {
        return `EightBit(${this.value})`;
    }
    /** Convert from sRGB to linear RGB. */
    linearize() {
        /** The upper limit of the original range. */
        const SCALE = 255;
        /** The current value mapped to a 0 to 1 range, so 255 becomes 1. */
        const value = this.value / SCALE;
        return value <= 0.03928
            ? value / 12.92
            : Math.pow((value + 0.055) / 1.055, 2.4);
    }
    /** Returns a Hex with the current value, e.g. Hex("#FF"). */
    toHex() {
        const value = this.value.toString(16).toUpperCase();
        return new hex_js_1.Hex(`#${value}`);
    }
}
exports.EightBit = EightBit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUErQjtBQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFekQsTUFBYSxRQUFRO0lBSWpCLFlBQVksS0FBK0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELDJDQUEyQztJQUMzQyxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxxRkFBcUY7SUFDckYsQ0FBQyxPQUFPLENBQUM7UUFDTCxPQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFDRCx1Q0FBdUM7SUFDdkMsU0FBUztRQUNMLDZDQUE2QztRQUM3QyxNQUFNLEtBQUssR0FBVyxHQUFHLENBQUM7UUFDMUIsb0VBQW9FO1FBQ3BFLE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLE9BQU8sS0FBSyxJQUFJLE9BQU87WUFDbkIsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLO1lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCw2REFBNkQ7SUFDN0QsS0FBSztRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELE9BQU8sSUFBSSxZQUFHLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQTlCRCw0QkE4QkMifQ==