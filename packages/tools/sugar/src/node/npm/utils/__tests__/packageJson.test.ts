import __packageJson from '../packageJson';
import __packageRoot from '../../../path/packageRoot';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

describe('sugar.node.npm.utils.packageJson', () => {
    it('Should fetch the "chokidar" package.json correctly', async (done) => {
        await __SSugarConfig.load();
        const json = __packageJson('chokidar', {
            rootDir: __packageRoot(__dirname),
        });
        expect(json.name).toBe('chokidar');
        done();
    });
});
