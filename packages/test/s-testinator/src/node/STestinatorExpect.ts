export default class STestinatorExpect {
    value: any;

    constructor(value: any) {
        this.value = value;
    }

    toBe(expectedValue: any) {
        this.value !== expectedValue && this._throw(expectedValue);
        return this;
    }

    _throw(expected: any, message?: string) {
        let finalMessage =
            message ?? `Expected ${this.value} to be ${expected}`;
        throw new Error(finalMessage);
    }
}
