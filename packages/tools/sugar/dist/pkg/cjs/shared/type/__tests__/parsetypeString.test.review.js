"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseTypeString_1 = __importDefault(require("../parseTypeString"));
describe('sugar.shared.type.parseTypeString', () => {
    it('Should parse type string "{String}" correctly', () => {
        const res = (0, parseTypeString_1.default)('{String}');
        expect(res.toString()).toBe('{String}');
        expect(res).toEqual([{ type: 'string', of: undefined }]);
    });
    it('Should parse type string "{Array<String>}" correctly', () => {
        const res = (0, parseTypeString_1.default)('{Array<String>}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });
    it('Should parse type string "{String[]}" correctly', () => {
        const res = (0, parseTypeString_1.default)('{String[]}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });
    it('Should parse type string "{String[]|Number}" correctly', () => {
        const res = (0, parseTypeString_1.default)('{String[]|Number}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
            {
                type: 'number',
                of: undefined,
            },
        ]);
    });
    it("Should parse type string \"{'hello'|'world'|23|1.45}\" correctly", () => {
        const res = (0, parseTypeString_1.default)("{'hello'|'world'|23|1.45}");
        expect(res).toEqual([
            { type: 'string', of: undefined, value: 'hello' },
            { type: 'string', of: undefined, value: 'world' },
            { type: 'number', of: undefined, value: 23 },
            { type: 'number', of: undefined, value: 1.45 },
        ]);
    });
    it("Should parse type string \"{('hello'|'world')[]}\" correctly", () => {
        const res = (0, parseTypeString_1.default)("{('hello'|'world')[]}");
        expect(res).toEqual([
            {
                type: 'array',
                of: [
                    { type: 'string', of: undefined, value: 'hello' },
                    { type: 'string', of: undefined, value: 'world' },
                ],
            },
        ]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQW1EO0FBRW5ELFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7SUFDL0MsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixFQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQjtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDakI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7UUFDdkQsTUFBTSxHQUFHLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxZQUFZLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2hCO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUNqQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtRQUM5RCxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixFQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQjtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUUsU0FBUzthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLEdBQUcsRUFBRTtRQUN4RSxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixFQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQ2pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7WUFDakQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1NBQ2pELENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhEQUE4RCxFQUFFLEdBQUcsRUFBRTtRQUNwRSxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixFQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQjtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUU7b0JBQ0EsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDakQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtpQkFDcEQ7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==