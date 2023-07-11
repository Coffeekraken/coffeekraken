import __tmpDir from '../../path/systemTmpDir.js';
import __unzip from '../unzip.js';

describe('sugar.node.zip.unzip', () => {
    it('Should unzip a simple file correctly at the same destination folder', async () => {
        const result = await __unzip(
            `${__dirname}/data/coffeekraken-new-logo.zip`,
            {
                dest: __tmpDir() + '/downloads',
            },
        );
        expect(result.dest).toBe(
            `${__tmpDir()}/downloads/coffeekraken-new-logo`,
        );
    });
});
