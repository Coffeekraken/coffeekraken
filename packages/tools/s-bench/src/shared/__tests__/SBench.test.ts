import __SBench from "../exports";
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __wait from '@coffeekraken/sugar/shared/time/wait';

describe('s-bench', () => {

    it('Should handle a basic time benchmark correctly', async (done) => {

        const bench = new __SBench('testing');

        bench.on('log', (log) => {
            console.log(__parseHtml(log.value));
        });

        bench.start();
        bench.step('compilation');
        bench.end();

        done();
    });

    it('Should handle a basic time benchmark using static methods correctly', async (done) => {

        __SBench.start('testing').on('log', (log) => {
            console.log(__parseHtml(log.value));
        });

        __SBench.start('testing');
        __SBench.step('testing', 'compilation');
        __SBench.end('testing');

        done();
    });

});