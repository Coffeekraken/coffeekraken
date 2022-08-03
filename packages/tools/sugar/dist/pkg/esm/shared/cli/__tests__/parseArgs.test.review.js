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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7UUFDaEQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQixTQUFTLEVBQUUsTUFBTTtZQUNqQixDQUFDLEVBQUUsSUFBSTtTQUNSLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9FQUFvRSxFQUFFLEdBQUcsRUFBRTtRQUM1RSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLENBQUMsRUFBRSxJQUFJO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUZBQXFGLEVBQUUsR0FBRyxFQUFFO1FBQzdGLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsU0FBUyxFQUFFLE1BQU07WUFDakIsQ0FBQyxFQUFFLElBQUk7WUFDUCxJQUFJLEVBQUUsSUFBSTtZQUNWLENBQUMsRUFBRSxJQUFJO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEZBQTRGLEVBQUUsR0FBRyxFQUFFO1FBQ3BHLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FDckIsMkRBQTJELEVBQzNEO1lBQ0Us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