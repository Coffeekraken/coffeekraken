import __parseTypeString from '../parseTypeString';

describe('sugar.shared.type.parseTypeString', () => {
    it('Should parse type string "{String}" correctly', () => {
        const res = __parseTypeString('{String}');

        expect(res.toString()).toBe('{String}');

        expect(res).toEqual([{ type: 'string', of: undefined }]);
    });

    it('Should parse type string "{Array<String>}" correctly', () => {
        const res = __parseTypeString('{Array<String>}');

        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });

    it('Should parse type string "{String[]}" correctly', () => {
        const res = __parseTypeString('{String[]}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });

    it('Should parse type string "{String[]|Number}" correctly', () => {
        const res = __parseTypeString('{String[]|Number}');

        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
            {
                type: 'number',
                of: undefined,
            },
        ]);
    });

    it("Should parse type string \"{'hello'|'world'|23|1.45}\" correctly", () => {
        const res = __parseTypeString("{'hello'|'world'|23|1.45}");

        expect(res).toEqual([
            { type: 'string', of: undefined, value: 'hello' },
            { type: 'string', of: undefined, value: 'world' },
            { type: 'number', of: undefined, value: 23 },
            { type: 'number', of: undefined, value: 1.45 },
        ]);
    });

    it("Should parse type string \"{('hello'|'world')[]}\" correctly", () => {
        const res = __parseTypeString("{('hello'|'world')[]}");

        expect(res).toEqual([
            {
                type: 'array',
                of: [
                    { type: 'string', of: undefined, value: 'hello' },
                    { type: 'string', of: undefined, value: 'world' },
                ],
            },
        ]);
    });
});
