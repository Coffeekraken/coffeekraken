import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SState from '../SState';

describe('@coffeekraken.s-state', () => {
    it('Should create and destroy a simple state correctly', async () => {
        // await __SSugarConfig.load();
        const state = new __SState({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });
        expect(state.plop).toBe('hello');
        expect(state.sub.title).toBe('yop');
    });
    it('Should create and listen for a simple string change correctly', async () => {
        // await __SSugarConfig.load();
        const state = new __SState({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });

        let listenerWorking = false;
        state.$set('sub.title', (data) => {
            listenerWorking = true;
        });

        state.sub.title = 'world';

        expect(listenerWorking).toBe(true);
        expect(state.sub.title).toBe('world');
    });
    it('Should create and listen for a simple string change using "glob" notation in the event listener correctly', async () => {
        // await __SSugarConfig.load();
        const state = new __SState({
            plop: 'hello',
            sub: {
                title: 'yop',
            },
        });

        let listenerWorking = false;
        state.$set('*', (data) => {
            listenerWorking = true;
        });

        state.sub.title = 'world';

        expect(listenerWorking).toBe(true);
        expect(state.sub.title).toBe('world');
    });

    it('Should handle "save" adapter correctly', async () => {
        // await __SSugarConfig.load();
        const state = new __SState(
            {
                plop: 'hello',
                sub: {
                    title: 'yop',
                },
            },
            {
                id: 'SState.test.ts',
                save: true,
            },
        );

        state.sub.title = 'world';

        await __wait(50);

        expect(state.sub.title).toBe('world');
    });
});
