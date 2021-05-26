import __parseArgs from '../parseArgs';
describe('sugar.shared.cli.parseArgs', () => {
    it('Should parse a simple string correctly', () => {
        const res = __parseArgs('--something cool -e true');
        expect(res).toEqual({
            something: 'cool',
            e: true
        });
    });
    it('Should parse a simple string with a none ending argument correctly', () => {
        const res = __parseArgs('--something cool -e');
        expect(res).toEqual({
            something: 'cool',
            e: true
        });
    });
    it('Should parse a simple string with multiple none value arguments one after the other', () => {
        const res = __parseArgs('--something cool -e --plop -i');
        expect(res).toEqual({
            something: 'cool',
            e: true,
            plop: true,
            i: true
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
        const res = __parseArgs(`-o "{'hello': 'world', '__plop': true}" --something World`, {
            valueQuote: '"'
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                __plop: true
            },
            something: 'World'
        });
    });
    it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
        const res = __parseArgs(`-o '{"hello": "world", "__plop": true}' --something World`, {
            valueQuote: "'"
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                __plop: true
            },
            something: 'World'
        });
    });
    it('Should parse correctly an object value passed in the string using the valueQuote setting `', () => {
        const res = __parseArgs("-o `{'hello': 'world', '__plop': true}` --something World", {
            valueQuote: '`'
        });
        expect(res).toEqual({
            o: {
                hello: 'world',
                __plop: true
            },
            something: 'World'
        });
    });
    it('Should parse correctly multiple same args into array', () => {
        const res = __parseArgs('-s js -s shared', {});
        expect(res).toEqual({
            s: ['js', 'shared']
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = __parseArgs("($coco: true, $plop: 'hello world')", {
            valueQuote: "'"
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world'
        });
    });
    it('Should parse correctly an array value passed in the string correctly', () => {
        const res = __parseArgs("-o `['plop', 'coco']` --something World", {
            valueQuote: '`'
        });
        expect(res).toEqual({
            o: ['plop', 'coco'],
            something: 'World'
        });
    });
    it('Should parse correctly a function style arguments with variable names specifies', () => {
        const res = __parseArgs("($coco: true, $plop: 'hello world')", {
            valueQuote: "'"
        });
        expect(res).toEqual({
            coco: true,
            plop: 'hello world'
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
            angle: 'var(--s-gradient-angle-inline, 45)'
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
            '2': 'Coco plop'
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFyZ3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtJQUMxQyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBQ2hELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsU0FBUyxFQUFFLE1BQU07WUFDakIsQ0FBQyxFQUFFLElBQUk7U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRSxHQUFHLEVBQUU7UUFDNUUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQixTQUFTLEVBQUUsTUFBTTtZQUNqQixDQUFDLEVBQUUsSUFBSTtTQUNSLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFGQUFxRixFQUFFLEdBQUcsRUFBRTtRQUM3RixNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLENBQUMsRUFBRSxJQUFJO1lBQ1AsSUFBSSxFQUFFLElBQUk7WUFDVixDQUFDLEVBQUUsSUFBSTtTQUNSLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRGQUE0RixFQUFFLEdBQUcsRUFBRTtRQUNwRyxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQ3JCLDJE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