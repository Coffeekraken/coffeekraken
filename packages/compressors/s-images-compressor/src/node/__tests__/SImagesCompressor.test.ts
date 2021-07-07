import __SImagesCompressor from '../SImagesCompressor';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';

describe('@coffeekraken.s-images-compressor.SImagesCompressor', () => {

    it('Should compress simple jpg files correctly', async (done) => {

        const outDir = `${__packageTmpDir()}/SImagesCompressor/tests`;

        const compressor = new __SImagesCompressor({
            imagesCompressor: {
                outDir,
                resolveGlob: {
                    defaultExcludes: false
                }
            }
        });

        const result = await compressor.compress([
            `${__dirname}/__data__/**/*.jpg`
        ]);

        console.log(result);

        done();
    });

});