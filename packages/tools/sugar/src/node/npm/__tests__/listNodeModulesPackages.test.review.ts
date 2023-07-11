import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __listNodeModulesPackages from '../listNodeModulesPackages.js';

describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
    it('Should list the sugar node_modules packages correctly', async () => {
        await __SSugarConfig.load();

        const modules = __listNodeModulesPackages({
            monorepo: true,
        });
        expect(Object.keys(modules).length).toBeGreaterThan(0);
    });
});
