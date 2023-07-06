export class Contrast {
    constructor(foreground, background) {
        this.foreground = new HexColor(foreground);
        this.background = new HexColor(background);
        this.value = (() => {
            const foreground = this.foreground
                .toEightBitColor()
                .luminosity();
            const background = this.background
                .toEightBitColor()
                .luminosity();
            const L1 = Math.max(foreground, background);
            const L2 = Math.min(foreground, background);
            const OFFSET = 0.05;
            return (L1 + OFFSET) / (L2 + OFFSET);
        })();
    }
    /** Returns the luminosity contrast ratio. */
    valueOf() {
        return this.value;
    }
}
export class EightBit {
    constructor(value) {
        this.value = Number(value);
    }
    /** Returns the current value, e.g. 255. */
    valueOf() {
        return this.value;
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
        return new Hex(`#${value}`);
    }
}
export class EightBitColor {
    constructor(R, G, B) {
        this.R = new EightBit(R);
        this.G = new EightBit(G);
        this.B = new EightBit(B);
    }
    /** Returns the current red, green and blue values, e.g. { R: 255, G: 255, B: 255 }. */
    valueOf() {
        const R = this.R.valueOf();
        const G = this.G.valueOf();
        const B = this.B.valueOf();
        return { R, G, B };
    }
    /** Returns the luminosity. */
    luminosity() {
        const R_COEFFICIENT = 0.2126;
        const G_COEFFICIENT = 0.7152;
        const B_COEFFICIENT = 0.0722;
        const R = this.R.linearize();
        const G = this.G.linearize();
        const B = this.B.linearize();
        return R_COEFFICIENT * R + G_COEFFICIENT * G + B_COEFFICIENT * B;
    }
    /** Returns a HexColor with the current value, e.g. Hex("#FFFFFF"). */
    toHexColor() {
        const R = this.R.toHex().valueOf();
        const G = this.G.toHex().valueOf();
        const B = this.B.toHex().valueOf();
        return new HexColor(`#${R}${G}${B}`);
    }
}
/**
 * Pads the provided string with another string (repeated, if needed) so that the resulting string reaches the given length. The padding is applied from the start (left) of the provided string.
 * @param string The provided string.
 * @param targetLength The length of the resulting string once the provided string has been padded. If the value is lower than the provided string's length, the provided string will be returned as is.
 * @param padString The string to pad the provided string with. The default value for this parameter is " " (U+0020).
 */
function padStart(string, targetLength, padString) {
    if (string.toString().length >= targetLength) {
        return string;
    }
    return padStart(padString.concat(string), targetLength, padString);
}
export class Hex {
    constructor(value) {
        this.value = value
            ? padStart(String(value).replace('#', '').toUpperCase(), 2, '0')
            : null;
    }
    /** Returns the current value, e.g. "FF". */
    valueOf() {
        return this.value;
    }
    /** Returns an EightBit with the current value, e.g. EightBit(255). */
    toEightBit() {
        const value = typeof this.value === 'string' ? parseInt(this.value, 16) : null;
        return new EightBit(value);
    }
}
export class HexColor {
    constructor(value) {
        this.value = (() => {
            if (!value) {
                return null;
            }
            const _value = (() => {
                switch (true) {
                    // Special case for 'black'
                    case String(value).toLowerCase() === 'black':
                        return '000000';
                    // Special case for 'white'
                    case String(value).toLowerCase() === 'white':
                        return 'FFFFFF';
                    default:
                        return String(value).replace('#', '');
                }
            })();
            switch (_value.length) {
                // Special case for '#AB'
                case 2:
                    return `${_value}${_value}${_value}`;
                // Special case for '#ABC'
                case 3:
                    return `${_value[0]}${_value[0]}${_value[1]}${_value[1]}${_value[2]}${_value[2]}`;
                default:
                    return _value;
            }
        })();
        this.R = this.value ? new Hex(this.value.substr(0, 2)) : null;
        this.G = this.value ? new Hex(this.value.substr(2, 2)) : null;
        this.B = this.value ? new Hex(this.value.substr(4, 2)) : null;
    }
    /** Returns the current value, e.g. "FF". */
    valueOf() {
        return this.value;
    }
    /** Returns an EightBit with the current value, e.g. { R: 255, G: 255, B: 255 }. */
    toEightBitColor() {
        const R = this.R ? this.R.toEightBit().valueOf() : null;
        const G = this.G ? this.G.toEightBit().valueOf() : null;
        const B = this.B ? this.B.toEightBit().valueOf() : null;
        return new EightBitColor(R, G, B);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxRQUFRO0lBUWpCLFlBQVksVUFBa0IsRUFBRSxVQUFrQjtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNmLE1BQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxVQUFVO2lCQUNyQyxlQUFlLEVBQUU7aUJBQ2pCLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxVQUFVO2lCQUNyQyxlQUFlLEVBQUU7aUJBQ2pCLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sRUFBRSxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sTUFBTSxHQUFXLElBQUksQ0FBQztZQUM1QixPQUFPLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQ0QsNkNBQTZDO0lBQzdDLE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFPLFFBQVE7SUFJakIsWUFBWSxLQUErQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsMkNBQTJDO0lBQzND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