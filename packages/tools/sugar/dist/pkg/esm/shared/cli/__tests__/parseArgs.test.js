import __parseArgs from '../parseArgs.js';
describe('sugar.shared.cli.parseArgs', () => {
    it('Should parse a simple string correctly', () => {
        const res = __parseArgs('--something cool -e true');
        expect(res).toEqual({
            something: 'cool',
            e: true,
        });
    });
    it('Should parse a simple string with a none ending argument correctly', () => {
        const res = __parseArgs('--something cool -e');
        expect(res).toEqual({
            something: 'cool',
            e: true,
        });
    });
    it('Should parse a simple string with multiple none value arguments one after the other', () => {
        const res = __parseArgs('--something cool -e --plop -i');
        expect(res).toEqual({
            something: 'cool',
            e: true,
            plop: true,
            i: true,
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
        const res = __parseArgs(`-o "{'hello': 'world', 'plop': true}" --something World`, {
            valueQuote: '"',
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true,
            },
            something: 'World',
        });
    });
    it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
        const res = __parseArgs(`-o '{"hello": "world", "plop": true}' --something World`, {
            valueQuote: "'",
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true,
            },
            something: 'World',
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting `', () => {
        const res = __parseArgs("-o `{'hello': 'world', 'plop': true}` --something World", {
            valueQuote: '`',
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                plop: true,
            },
            something: 'World',
        });
    });
    it('Should parse correctly multiple same args into array', () => {
        const res = __parseArgs('-s js -s shared', {});
        expect(res).toEqual({
            s: ['js', 'shared'],
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = __parseArgs("($coco: true, $plop: 'hello world')", {
            valueQuote: "'",
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world',
        });
    });
    it('Should parse correctly an array value passed in the string correctly', () => {
        const res = __parseArgs("-o `['plop', 'coco']` --something World", {
            valueQuote: '`',
        });
        expect(res).toEqual({
            o: ['plop', 'coco'],
            something: 'World',
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = __parseArgs("($coco: true, $plop: 'hello world')", {
            valueQuote: "'",
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world',
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies and nested functions calls', () => {
        const res = __parseArgs(`(
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
            angle: 'var(--s-gradient-angle-inline, 45)',
        });
    });
    it('Should parse correctly a nested parentheses arguments', () => {
        const res = __parseArgs(`(
        hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop')),
        hello world,
        'Coco plop'
      )`, {});
        expect(res).toEqual({
            '0': "hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop'))",
            '1': 'hello world',
            '2': 'Coco plop',
        });
    });
    it('Should parse correctly an argument string with "treatNoAsBoolean" to true', () => {
        const res = __parseArgs('--something cool --no-format --else plop --no-build', {
            valueQuote: "'",
            treatNoAsBoolean: true,
        });
        expect(res).toEqual({
            something: 'cool',
            format: false,
            else: 'plop',
            build: false,
        });
    });
    it('Should parse correctly an argument string without "treatNoAsBoolean" to true', () => {
        const res = __parseArgs('--something cool --no-format --else plop --no-build', {
            valueQuote: "'",
            treatNoAsBoolean: false,
        });
        expect(res).toEqual({
            something: 'cool',
            noFormat: true,
            else: 'plop',
            noBuild: true,
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBRTFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUM5QyxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLENBQUMsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0VBQW9FLEVBQUUsR0FBRyxFQUFFO1FBQzFFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsQ0FBQyxFQUFFLElBQUk7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxRkFBcUYsRUFBRSxHQUFHLEVBQUU7UUFDM0YsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixDQUFDLEVBQUUsSUFBSTtZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsQ0FBQyxFQUFFLElBQUk7U0FDVixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRSxHQUFHLEVBQUU7UUFDbEcsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUNuQix5REFBeUQsRUFDekQ7WUFD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