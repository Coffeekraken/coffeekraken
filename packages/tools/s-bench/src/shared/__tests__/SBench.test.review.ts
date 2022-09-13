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
