"use strict";
module.exports = (__convert) => {
    describe('sugar.js.time.convert', () => {
        it('Should convert the string "1s" to 1000ms', () => {
            expect(__convert('1s', 'ms')).toBe(1000);
        });
        it('Should convert the string "ms" to 60000ms', () => {
            expect(__convert('1m', 'ms')).toBe(60000);
        });
        it('Should convert the string "2h" to "120m"', () => {
            expect(__convert('2h', 'm')).toBe(120);
        });
        it('Should convert the string "1week" to "7d"', () => {
            expect(__convert('1week', 'd')).toBe(7);
        });
        it('Should convert the string "10weeks" to "70d"', () => {
            expect(__convert('10weeks', 'd')).toBe(70);
        });
    });
};
