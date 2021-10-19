import __listNodeModulesPackages from '../listNodeModulesPackages';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
    it('Should list the sugar node_modules packages correctly', async (done) => {
        await __SSugarConfig.load();

        const modules = __listNodeModulesPackages({
            monorepo: true,
        });
        expect(Object.keys(modules).length).toBeGreaterThan(0);
        done();
    });
});
