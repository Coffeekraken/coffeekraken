import __camelCaseProps from '../camelCaseProps.js';
describe('sugar.shared.object.camelCaseProps', () => {
    it('Should process a simple 1 level object correctly', () => {
        const newObj = __camelCaseProps({
            'hello-world': true,
            plop: 'world',
            'plop-World': true,
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: true,
        });
    });
    it('Should process a multiple levels object correctly', () => {
        const newObj = __camelCaseProps({
            'hello-world': true,
            plop: 'world',
            'plop-World': {
                yep: 'ok',
                plop_please: false,
            },
        });
        expect(newObj).toEqual({
            helloWorld: true,
            plop: 'world',
            plopWorld: {
                yep: 'ok',
                plopPlease: false,
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1FBQ3hELE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDO1lBQzVCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztZQUM1QixhQUFhLEVBQUUsSUFBSTtZQUNuQixJQUFJLEVBQUUsT0FBTztZQUNiLFlBQVksRUFBRTtnQkFDVixHQUFHLEVBQUUsSUFBSTtnQkFDVCxXQUFXLEVBQUUsS0FBSzthQUNyQjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLE9BQU87WUFDYixTQUFTLEVBQUU7Z0JBQ1AsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsVUFBVSxFQUFFLEtBQUs7YUFDcEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=