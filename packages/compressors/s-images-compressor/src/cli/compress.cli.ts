import __SProcess from '@coffeekraken/s-process';
import __SImagesCompressorCompressParamsInterface from '../node/interface/SImagesCompressorCompressParamsInterface';
import __SImagesCompressor from '../node/SImagesCompressor';


export default async function build(stringArgs = '') {

    const compressor = new __SImagesCompressor();

    const pro = __SProcess.from(
        compressor.compress.bind(compressor)
    , {
        process: {
          interface: __SImagesCompressorCompressParamsInterface
        }   
    });
    const res = await pro.run(stringArgs);
    console.log(res);
}
