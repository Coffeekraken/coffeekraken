var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../parseArgs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parseArgs_1 = __importDefault(require("../parseArgs"));
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
        it('Should parse correctly an array value passed in the string correctly', () => {
            const res = parseArgs_1.default("-o `['plop', 'coco']` --something World", {
                valueQuote: '`'
            });
            expect(res).toEqual({
                o: ['plop', 'coco'],
                something: 'World'
            });
        });
        it('Should parse correctly a function style arguments with variable names specifies', () => {
            const res = parseArgs_1.default("($coco: true, $plop: 'hello world')", {
                valueQuote: "'"
            });
            expect(res).toEqual({
                coco: true,
                plop: 'hello world'
            });
        });
        it('Should parse correctly a function style arguments with variable names specifies and nested functions calls', () => {
            const res = parseArgs_1.default(`(
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFyZ3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDZEQUF1QztJQUV2QyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQzFDLHVEQUF1RDtRQUN2RCx5REFBeUQ7UUFDekQsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixjQUFjO1FBQ2QsUUFBUTtRQUNSLE1BQU07UUFFTixtRkFBbUY7UUFDbkYsb0RBQW9EO1FBQ3BELDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIsY0FBYztRQUNkLFFBQVE7UUFDUixNQUFNO1FBRU4sb0dBQW9HO1FBQ3BHLDhEQUE4RDtRQUM5RCwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLFFBQVE7UUFDUixNQUFNO1FBRU4sMkdBQTJHO1FBQzNHLDZCQUE2QjtRQUM3QixtRUFBbUU7UUFDbkUsUUFBUTtRQUNSLHdCQUF3QjtRQUN4QixRQUFRO1FBQ1IsT0FBTztRQUNQLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QseUJBQXlCO1FBQ3pCLFFBQVE7UUFDUixNQUFNO1FBRU4sMkdBQTJHO1FBQzNHLDZCQUE2QjtRQUM3QixtRUFBbUU7UUFDbkUsUUFBUTtRQUNSLHdCQUF3QjtRQUN4QixRQUFRO1FBQ1IsT0FBTztRQUNQLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QseUJBQXlCO1FBQ3pCLFFBQVE7UUFDUixNQUFNO1FBRU4sMkdBQTJHO1FBQzNHLDZCQUE2QjtRQUM3QixtRUFBbUU7UUFDbkUsUUFBUTtRQUNSLHdCQUF3QjtRQUN4QixRQUFRO1FBQ1IsT0FBTztRQUNQLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QseUJBQXlCO1FBQ3pCLFFBQVE7UUFDUixNQUFNO1FBRU4sRUFBRSxDQUFDLHNFQUFzRSxFQUFFLEdBQUcsRUFBRTtZQUM5RSxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLHlDQUF5QyxFQUFFO2dCQUNqRSxVQUFVLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsQixDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO2dCQUNuQixTQUFTLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRkFBaUYsRUFBRSxHQUFHLEVBQUU7WUFDekYsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxxQ0FBcUMsRUFBRTtnQkFDN0QsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLGFBQWE7YUFDcEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNEdBQTRHLEVBQUUsR0FBRyxFQUFFO1lBQ3BILE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQ3JCOzs7OztRQUtFLEVBQ0Y7WUFDRSxrQkFBa0I7YUFDbkIsQ0FDRixDQUFDO1lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEdBQUcsRUFBRSxvQ0FBb0M7Z0JBQ3pDLElBQUksRUFBRSx1Q0FBdUM7Z0JBQzdDLEtBQUssRUFBRSxvQ0FBb0M7YUFDNUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9