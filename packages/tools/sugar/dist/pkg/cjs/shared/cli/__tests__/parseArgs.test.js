"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../parseArgs"));
describe('sugar.shared.cli.parseArgs', () => {
    it('Should parse a simple string correctly', () => {
        const res = (0, parseArgs_1.default)('--something cool -e true');
        expect(res).toEqual({
            something: 'cool',
            e: true
        });
    });
    it('Should parse a simple string with a none ending argument correctly', () => {
        const res = (0, parseArgs_1.default)('--something cool -e');
        expect(res).toEqual({
            something: 'cool',
            e: true
        });
    });
    it('Should parse a simple string with multiple none value arguments one after the other', () => {
        const res = (0, parseArgs_1.default)('--something cool -e --plop -i');
        expect(res).toEqual({
            something: 'cool',
            e: true,
            plop: true,
            i: true
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
        const res = (0, parseArgs_1.default)(`-o "{'hello': 'world', 'plop': true}" --something World`, {
            valueQuote: '"'
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true
            },
            something: 'World'
        });
    });
    it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
        const res = (0, parseArgs_1.default)(`-o '{"hello": "world", "plop": true}' --something World`, {
            valueQuote: "'"
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true
            },
            something: 'World'
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting `', () => {
        const res = (0, parseArgs_1.default)("-o `{'hello': 'world', 'plop': true}` --something World", {
            valueQuote: '`'
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true
            },
            something: 'World'
        });
    });
    it('Should parse correctly multiple same args into array', () => {
        const res = (0, parseArgs_1.default)('-s js -s shared', {});
        expect(res).toEqual({
            s: ['js', 'shared']
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = (0, parseArgs_1.default)("($coco: true, $plop: 'hello world')", {
            valueQuote: "'"
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world'
        });
    });
    it('Should parse correctly an array value passed in the string correctly', () => {
        const res = (0, parseArgs_1.default)("-o `['plop', 'coco']` --something World", {
            valueQuote: '`'
        });
        expect(res).toEqual({
            o: ['plop', 'coco'],
            something: 'World'
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = (0, parseArgs_1.default)("($coco: true, $plop: 'hello world')", {
            valueQuote: "'"
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world'
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies and nested functions calls', () => {
        const res = (0, parseArgs_1.default)(`(
          $start: default,
          $end: sugar.color(default, --darken 10%),
          $type: var(--s-gradient-type-inline, linear),
          $angle: var(--s-gradient-angle-inline, 45)
      )`, {
        // valueQuote: "'"
        });
        expect(res).toEqual({
            start: 'default',
            end: 'sugar.color(default, --darken 10%)',
            type: 'var(--s-gradient-type-inline, linear)',
            angle: 'var(--s-gradient-angle-inline, 45)'
        });
    });
    it('Should parse correctly a nested parentheses arguments', () => {
        const res = (0, parseArgs_1.default)(`(
        hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop')),
        hello world,
        'Coco plop'
      )`, {});
        expect(res).toEqual({
            '0': "hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop'))",
            '1': 'hello world',
            '2': 'Coco plop'
        });
    });
    it('Should parse correctly an argument string with "treatNoAsBoolean" to true', () => {
        const res = (0, parseArgs_1.default)("--something cool --no-format --else plop --no-build", {
            valueQuote: "'",
            treatNoAsBoolean: true
        });
        expect(res).toEqual({
            something: 'cool',
            format: false,
            else: 'plop',
            build: false
        });
    });
    it('Should parse correctly an argument string without "treatNoAsBoolean" to true', () => {
        const res = (0, parseArgs_1.default)("--something cool --no-format --else plop --no-build", {
            valueQuote: "'",
            treatNoAsBoolean: false
        });
        expect(res).toEqual({
            something: 'cool',
            noFormat: true,
            else: 'plop',
            noBuild: true
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxNQUFNLEdBQUcsR0FBRyxJQUFBLG1CQUFXLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLENBQUMsRUFBRSxJQUFJO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0VBQW9FLEVBQUUsR0FBRyxFQUFFO1FBQzVFLE1BQU0sR0FBRyxHQUFHLElBQUEsbUJBQVcsRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsU0FBUyxFQUFFLE1BQU07WUFDakIsQ0FBQyxFQUFFLElBQUk7U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxRkFBcUYsRUFBRSxHQUFHLEVBQUU7UUFDN0YsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUFDLCtCQUErQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQixTQUFTLEVBQUUsTUFBTTtZQUNqQixDQUFDLEVBQUUsSUFBSTtZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsQ0FBQyxFQUFFLElBQUk7U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRSxHQUFHLEVBQUU7UUFDcEcsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUNyQix5REFBeUQs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