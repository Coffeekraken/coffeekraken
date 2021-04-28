import __parseArgs from '../parseArgs';
describe('sugar.shared.cli.parseArgs', () => {
    // it('Should parse a simple string correctly', () => {
    //   const res = __parseArgs('--something cool -e true');
    //   expect(res).toEqual({
    //     something: 'cool',
    //     e: true
    //   });
    // });
    // it('Should parse a simple string with a none ending argument correctly', () => {
    //   const res = __parseArgs('--something cool -e');
    //   expect(res).toEqual({
    //     something: 'cool',
    //     e: true
    //   });
    // });
    // it('Should parse a simple string with multiple none value arguments one after the other', () => {
    //   const res = __parseArgs('--something cool -e --plop -i');
    //   expect(res).toEqual({
    //     something: 'cool',
    //     e: true,
    //     plop: true,
    //     i: true
    //   });
    // });
    // it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
    //   const res = __parseArgs(
    //     `-o "{'hello': 'world', '__plop': true}" --something World`,
    //     {
    //       valueQuote: '"'
    //     }
    //   );
    //   expect(res).toEqual({
    //     o: {
    //       hello: 'world',
    //       __plop: true
    //     },
    //     something: 'World'
    //   });
    // });
    // it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
    //   const res = __parseArgs(
    //     `-o '{"hello": "world", "__plop": true}' --something World`,
    //     {
    //       valueQuote: "'"
    //     }
    //   );
    //   expect(res).toEqual({
    //     o: {
    //       hello: 'world',
    //       __plop: true
    //     },
    //     something: 'World'
    //   });
    // });
    // it('Should parse correctly an object value passed in the string using the valueQuote setting `', () => {
    //   const res = __parseArgs(
    //     "-o `{'hello': 'world', '__plop': true}` --something World",
    //     {
    //       valueQuote: '`'
    //     }
    //   );
    //   expect(res).toEqual({
    //     o: {
    //       hello: 'world',
    //       __plop: true
    //     },
    //     something: 'World'
    //   });
    // });
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFyZ3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFFdkMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtJQUMxQyx1REFBdUQ7SUFDdkQseURBQXlEO0lBQ3pELDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsY0FBYztJQUNkLFFBQVE7SUFDUixNQUFNO0lBRU4sbUZBQW1GO0lBQ25GLG9EQUFvRDtJQUNwRCwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLGNBQWM7SUFDZCxRQUFRO0lBQ1IsTUFBTTtJQUVOLG9HQUFvRztJQUNwRyw4REFBOEQ7SUFDOUQsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxRQUFRO0lBQ1IsTUFBTTtJQUVOLDJHQUEyRztJQUMzRyw2QkFBNkI7SUFDN0IsbUVBQW1FO0lBQ25FLFFBQVE7SUFDUix3QkFBd0I7SUFDeEIsUUFBUTtJQUNSLE9BQU87SUFDUCwwQkFBMEI7SUFDMUIsV0FBVztJQUNYLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsU0FBUztJQUNULHlCQUF5QjtJQUN6QixRQUFRO0lBQ1IsTUFBTTtJQUVOLDJHQUEyRztJQUMzRyw2QkFBNkI7SUFDN0IsbUVBQW1FO0lBQ25FLFFBQVE7SUFDUix3QkFBd0I7SUFDeEIsUUFBUTtJQUNSLE9BQU87SUFDUCwwQkFBMEI7SUFDMUIsV0FBVztJQUNYLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsU0FBUztJQUNULHlCQUF5QjtJQUN6QixRQUFRO0lBQ1IsTUFBTTtJQUVOLDJHQUEyRztJQUMzRyw2QkFBNkI7SUFDN0IsbUVBQW1FO0lBQ25FLFFBQVE7SUFDUix3QkFBd0I7SUFDeEIsUUFBUTtJQUNSLE9BQU87SUFDUCwwQkFBMEI7SUFDMUIsV0FBVztJQUNYLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsU0FBUztJQUNULHlCQUF5QjtJQUN6QixRQUFRO0lBQ1IsTUFBTTtJQUVOLEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxHQUFHLEVBQUU7UUFDOUQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpRkFBaUYsRUFBRSxHQUFHLEVBQUU7UUFDekYsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLHFDQUFxQyxFQUFFO1lBQzdELFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsYUFBYTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLHlDQUF5QyxFQUFFO1lBQ2pFLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUNuQixTQUFTLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpRkFBaUYsRUFBRSxHQUFHLEVBQUU7UUFDekYsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLHFDQUFxQyxFQUFFO1lBQzdELFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsYUFBYTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0R0FBNEcsRUFBRSxHQUFHLEVBQUU7UUFDcEgsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUNyQjs7Ozs7UUFLRSxFQUNGO1FBQ0Usa0JBQWtCO1NBQ25CLENBQ0YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLG9DQUFvQztZQUN6QyxJQUFJLEVBQUUsdUNBQXVDO1lBQzdDLEtBQUssRUFBRSxvQ0FBb0M7U0FDNUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9