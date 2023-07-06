export class Contrast {
    /** The foreground color, e.g. "#FFFFFF". */
    foreground: HexColor;
    /** The background color, e.g. "#FFFFFF". */
    background: HexColor;
    /** The luminosity contrast ratio, e.g. 4.5. */
    value: number;

    constructor(foreground: string, background: string) {
        this.foreground = new HexColor(foreground);
        this.background = new HexColor(background);
        this.value = (() => {
            const foreground: number = this.foreground
                .toEightBitColor()
                .luminosity();
            const background: number = this.background
                .toEightBitColor()
                .luminosity();
            const L1: number = Math.max(foreground, background);
            const L2: number = Math.min(foreground, background);
            const OFFSET: number = 0.05;
            return (L1 + OFFSET) / (L2 + OFFSET);
        })();
    }
    /** Returns the luminosity contrast ratio. */
    valueOf(): number {
        return this.value;
    }
}

export class EightBit {
    /** A number between 0 and 255. */
    value: number;

    constructor(value: EightBit | number | null) {
        this.value = Number(value);
    }
    /** Returns the current value, e.g. 255. */
    valueOf(): number {
        return this.value;
    }
    /** Convert from sRGB to linear RGB. */
    linearize(): number {
        /** The upper limit of the original range. */
        const SCALE: number = 255;
        /** The current value mapped to a 0 to 1 range, so 255 becomes 1. */
        const value: number = this.value / SCALE;
        return value <= 0.03928
            ? value / 12.92
            : Math.pow((value + 0.055) / 1.055, 2.4);
    }
    /** Returns a Hex with the current value, e.g. Hex("#FF"). */
    toHex(): Hex {
        const value = this.value.toString(16).toUpperCase();
        return new Hex(`#${value}`);
    }
}

export class EightBitColor {
    /** The current red value, e.g. EightBit(255). */
    R: EightBit;
    /** The current green value, e.g. EightBit(255). */
    G: EightBit;
    /** The current blue value, e.g. EightBit(255). */
    B: EightBit;

    constructor(
        R: EightBit | number | null,
        G: EightBit | number | null,
        B: EightBit | number | null,
    ) {
        this.R = new EightBit(R);
        this.G = new EightBit(G);
        this.B = new EightBit(B);
    }
    /** Returns the current red, green and blue values, e.g. { R: 255, G: 255, B: 255 }. */
    valueOf(): { R: number; G: number; B: number } {
        const R: number = this.R.valueOf();
        const G: number = this.G.valueOf();
        const B: number = this.B.valueOf();
        return { R, G, B };
    }
    /** Returns the luminosity. */
    luminosity(): number {
        const R_COEFFICIENT: number = 0.2126;
        const G_COEFFICIENT: number = 0.7152;
        const B_COEFFICIENT: number = 0.0722;
        const R: number = this.R.linearize();
        const G: number = this.G.linearize();
        const B: number = this.B.linearize();
        return R_COEFFICIENT * R + G_COEFFICIENT * G + B_COEFFICIENT * B;
    }
    /** Returns a HexColor with the current value, e.g. Hex("#FFFFFF"). */
    toHexColor(): HexColor {
        const R: string | null = this.R.toHex().valueOf();
        const G: string | null = this.G.toHex().valueOf();
        const B: string | null = this.B.toHex().valueOf();
        return new HexColor(`#${R}${G}${B}`);
    }
}

/**
 * Pads the provided string with another string (repeated, if needed) so that the resulting string reaches the given length. The padding is applied from the start (left) of the provided string.
 * @param string The provided string.
 * @param targetLength The length of the resulting string once the provided string has been padded. If the value is lower than the provided string's length, the provided string will be returned as is.
 * @param padString The string to pad the provided string with. The default value for this parameter is " " (U+0020).
 */
function padStart(
    string: string,
    targetLength: number,
    padString: string,
): string {
    if (string.toString().length >= targetLength) {
        return string;
    }
    return padStart(padString.concat(string), targetLength, padString);
}

export class Hex {
    /** The string representation of a hexadecimal value between 0 ("00") and 255 ("FF"). */
    value: string | null;

    constructor(value?: string | null) {
        this.value = value
            ? padStart(String(value).replace('#', '').toUpperCase(), 2, '0')
            : null;
    }
    /** Returns the current value, e.g. "FF". */
    valueOf(): string | null {
        return this.value;
    }
    /** Returns an EightBit with the current value, e.g. EightBit(255). */
    toEightBit(): EightBit {
        const value: number | null =
            typeof this.value === 'string' ? parseInt(this.value, 16) : null;
        return new EightBit(value);
    }
}

export class HexColor {
    /** The string representation of a hexadecimal value between 0 ("00") and 255 ("FF"). */
    value: string | null;
    /** The current red value, e.g. "#FF". */
    R: Hex | null;
    /** The current green value, e.g. "#FF". */
    G: Hex | null;
    /** The current blue value, e.g. "#FF". */
    B: Hex | null;

    constructor(value?: string | null) {
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
    valueOf(): string | null {
        return this.value;
    }
    /** Returns an EightBit with the current value, e.g. { R: 255, G: 255, B: 255 }. */
    toEightBitColor(): EightBitColor {
        const R: number | null = this.R ? this.R.toEightBit().valueOf() : null;
        const G: number | null = this.G ? this.G.toEightBit().valueOf() : null;
        const B: number | null = this.B ? this.B.toEightBit().valueOf() : null;
        return new EightBitColor(R, G, B);
    }
}
