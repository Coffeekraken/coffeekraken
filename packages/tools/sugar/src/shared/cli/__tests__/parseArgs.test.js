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
        it('Should parse a simple string correctly', () => {
            const res = parseArgs_1.default('--something cool -e true');
            expect(res).toEqual({
                something: 'cool',
                e: true
            });
        });
        it('Should parse a simple string with a none ending argument correctly', () => {
            const res = parseArgs_1.default('--something cool -e');
            expect(res).toEqual({
                something: 'cool',
                e: true
            });
        });
        it('Should parse a simple string with multiple none value arguments one after the other', () => {
            const res = parseArgs_1.default('--something cool -e --plop -i');
            expect(res).toEqual({
                something: 'cool',
                e: true,
                plop: true,
                i: true
            });
        });
        it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
            const res = parseArgs_1.default(`-o "{'hello': 'world', '__plop': true}" --something World`, {
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
            const res = parseArgs_1.default(`-o '{"hello": "world", "__plop": true}' --something World`, {
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
            const res = parseArgs_1.default("-o `{'hello': 'world', '__plop': true}` --something World", {
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
        it('Should parse correctly an array value passed in the string correctly', () => {
            const res = parseArgs_1.default("-o `['plop', 'coco']` --something World", {
                valueQuote: '`'
            });
            expect(res).toEqual({
                o: ['plop', 'coco'],
                something: 'World'
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFyZ3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDZEQUF1QztJQUV2QyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQzFDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixDQUFDLEVBQUUsSUFBSTthQUNSLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9FQUFvRSxFQUFFLEdBQUcsRUFBRTtZQUM1RSxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLENBQUMsRUFBRSxJQUFJO2FBQ1IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMscUZBQXFGLEVBQUUsR0FBRyxFQUFFO1lBQzdGLE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsTUFBTTtnQkFDakIsQ0FBQyxFQUFFLElBQUk7Z0JBQ1AsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsQ0FBQyxFQUFFLElBQUk7YUFDUixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRSxHQUFHLEVBQUU7WUFDcEcsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FDckIsMkRBQTJELEVBQzNEO2dCQUNFLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQ0YsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLENBQUMsRUFBRTtvQkFDRCxLQUFLLEVBQUUsT0FBTztvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRSxHQUFHLEVBQUU7WUFDcEcsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FDckIsMkRBQTJELEVBQzNEO2dCQUNFLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQ0YsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLENBQUMsRUFBRTtvQkFDRCxLQUFLLEVBQUUsT0FBTztvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRSxHQUFHLEVBQUU7WUFDcEcsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FDckIsMkRBQTJELEVBQzNEO2dCQUNFLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQ0YsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLENBQUMsRUFBRTtvQkFDRCxLQUFLLEVBQUUsT0FBTztvQkFDZCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLEVBQUU7WUFDOUUsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyx5Q0FBeUMsRUFBRTtnQkFDakUsVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztnQkFDbkIsU0FBUyxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9