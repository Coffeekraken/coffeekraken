import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';

export default function configFiles(configId: string, simplify = false): any[] {
    const paths = __SSugarConfig.filesPaths
        .filter((path) => {
            return path.includes(`/${configId}.config.js`);
        })
        .map((path) => {
            const obj = __SFile.new(path).toObject();
            if (simplify) {
                // obj.content = __stripDocblocks(obj.content);
                obj.content = __stripSourcemap(obj.content);
            }
            return obj;
        });
    return paths;
}
