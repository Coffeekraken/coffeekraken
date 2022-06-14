import __wait from '@coffeekraken/sugar/shared/time/wait';

describe('sitemap.test.ts', () => {
    it('Should execute correctly', async () => {
        await __wait(1000);
    });

    it('Should execute correctly 3', async () => {
        expect('coco').toBe('ddcoco');
    });
});
