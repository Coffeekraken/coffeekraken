import __SSugarConfig from '@coffeekraken/s-sugar-config';

beforeAll(function () {
    return new Promise(async (resolve) => {
        await __SSugarConfig.load();
        resolve();
    });
});
