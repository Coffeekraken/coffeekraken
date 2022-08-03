"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = __importDefault(require("../exports"));
describe('s-bench', () => {
    it('Should handle a basic time benchmark correctly', () => {
        const bench = new exports_1.default('testing');
        bench.start();
        bench.step('compilation');
        const end = bench.end().toString();
        expect(true).toBe(typeof end === 'string');
    });
    it('Should handle a basic time benchmark using static methods correctly', () => {
        // __SBench.start('testing').on('log', (log) => {
        //     console.log(__parseHtml(log.value));
        // });
        // __SBench.start('testing');
        // __SBench.step('testing', 'compilation');
        // __SBench.end('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQWtDO0FBSWxDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7UUFDdEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUUsR0FBRyxFQUFFO1FBQzNFLGlEQUFpRDtRQUNqRCwyQ0FBMkM7UUFDM0MsTUFBTTtRQUNOLDZCQUE2QjtRQUM3QiwyQ0FBMkM7UUFDM0MsMkJBQTJCO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==