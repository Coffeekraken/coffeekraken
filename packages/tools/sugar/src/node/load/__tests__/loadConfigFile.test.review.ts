
import __loadConfigFile from '../loadConfigFile';

describe('sugar.node.config.loadConfigFile', () => {
    it('Should load a simple js file correctly', async () => {
        const config = await __loadConfigFile('config.js', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.js',
        });
    });
    it('Should load a simple yaml file correctly', async () => {
        const config = await __loadConfigFile('config.yml', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.yml',
        });
    });
    it('Should load a file that exists against others that not correctly', async () => {
        const config = await __loadConfigFile(
            ['support.js', 'something.ts', 'config.yml'],
            {
                rootDir: `${__dirname}/data`,
            },
        );
        expect(config).toEqual({
            name: 'config.yml',
        });
    });
});
