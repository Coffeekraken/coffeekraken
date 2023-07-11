import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRootDir from '../../path/packageRootDir.js';
import __packageJsonSync from '../packageJsonSync.js';

describe('sugar.node.npm.utils.packageJson', () => {
    it('Should fetch the "chokidar" package.json correctly', async () => {
        await __SSugarConfig.load();
        const json = __packageJsonSync('chokidar', {
            rootDir: __packageRootDir(__dirname),
        });
        expect(json.name).toBe('chokidar');
    });
});
