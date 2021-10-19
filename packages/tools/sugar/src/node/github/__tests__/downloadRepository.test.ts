import __downloadRepository from '../downloadRepository';
import __fs from 'fs';
import __tmpDir from '../../path/systemTmpDir';

describe('sugar.node.github.downloadRepository', () => {
    it('Should download a repository successfully', async (done) => {
        const repo = await __downloadRepository('Coffeekraken/gridle', {});

        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-gridle-master.zip`,
        });

        done();
    }, 999999);

    it('Should download a repository and unzip it successfully', async (done) => {
        const repo = await __downloadRepository('Coffeekraken/gridle', {
            unzip: true,
        });

        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-gridle-master`,
        });

        done();
    }, 999999);
});
