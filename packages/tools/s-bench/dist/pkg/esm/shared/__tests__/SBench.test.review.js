import __SBench from '../exports';
describe('s-bench', () => {
    it('Should handle a basic time benchmark correctly', () => {
        const bench = new __SBench('testing');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUlsQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUNyQixFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3RELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUUsR0FBRyxFQUFFO1FBQzNFLGlEQUFpRDtRQUNqRCwyQ0FBMkM7UUFDM0MsTUFBTTtRQUNOLDZCQUE2QjtRQUM3QiwyQ0FBMkM7UUFDM0MsMkJBQTJCO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==