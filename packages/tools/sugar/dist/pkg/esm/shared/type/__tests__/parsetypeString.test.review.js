import __parseTypeString from '../parseTypeString.js';
describe('sugar.shared.type.parseTypeString', () => {
    it('Should parse type string "{String}" correctly', () => {
        const res = __parseTypeString('{String}');
        expect(res.toString()).toBe('{String}');
        expect(res).toEqual([{ type: 'string', of: undefined }]);
    });
    it('Should parse type string "{Array<String>}" correctly', () => {
        const res = __parseTypeString('{Array<String>}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });
    it('Should parse type string "{String[]}" correctly', () => {
        const res = __parseTypeString('{String[]}');
        expect(res).toEqual([
            {
                type: 'array',
                of: ['string'],
            },
        ]);
    });
    it('Should parse type string "{String[]|Number}" correctly', () => {
        const res = __parseTypeString('{String[]|Number}');
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
        const res = __parseTypeString("{'hello'|'world'|23|1.45}");
        expect(res).toEqual([
            { type: 'string', of: undefined, value: 'hello' },
            { type: 'string', of: undefined, value: 'world' },
            { type: 'number', of: undefined, value: 23 },
            { type: 'number', of: undefined, value: 1.45 },
        ]);
    });
    it("Should parse type string \"{('hello'|'world')[]}\" correctly", () => {
        const res = __parseTypeString("{('hello'|'world')[]}");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUJBQWlCLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO1FBQ3JELE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtRQUM1RCxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEI7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ2pCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3ZELE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEI7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ2pCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUUsR0FBRyxFQUFFO1FBQzlELE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoQjtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUUsU0FBUzthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLEdBQUcsRUFBRTtRQUN4RSxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRTNELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNqRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQ2pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDNUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtTQUNqRCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxHQUFHLEVBQUU7UUFDcEUsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2hCO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLEVBQUUsRUFBRTtvQkFDQSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO29CQUNqRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2lCQUNwRDthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9