// @ts-nocheck

import __SType from '../SType';

describe(`@coffeekraken/s-type`, () => {

    it('Should handle Numbers correctly', (done) => {

        const type = new __SType('Number');

        expect(type.is(10)).toBe(true);
        expect(type.is('10')).toBe(false);
        expect(type.is(true)).toBe(false);
        expect(type.is(false)).toBe(false);
        expect(type.is(12.4)).toBe(true);
        expect(type.is([10])).toBe(false);
        expect(type.is(null)).toBe(false);
        expect(type.is(undefined)).toBe(false);
        expect(type.is({something:10})).toBe(false);

        expect(type.cast(10)).toBe(10);
        expect(type.cast('10')).toBe(10);
        expect(() => {
            type.cast({something: 10});
        }).toThrow();
        expect(() => {
            type.cast([10]);
        }).toThrow();
        expect(() => {
            type.cast(null);
        }).toThrow();
        expect(() => {
            type.cast(undefined);
        }).toThrow();

        done();
    });

});