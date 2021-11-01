import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';

/**
 * @name            configFiles
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the SFile object representation of each config files that correspond to the passed configId
 *
 * @param       {String}        configId            The config id like "frontendServer", etc...
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
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
