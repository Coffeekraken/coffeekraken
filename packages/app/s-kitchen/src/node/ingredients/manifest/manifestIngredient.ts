import __SLog from '@coffeekraken/s-log';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        manifestIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const manifestIngredient: ISKitchenIngredient = {
    id: 'manifest',
    description:
        'Add the default <cyan>manifest.json</cyan> into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar', 'next'],
    async add({ ask, log, emit }) {
        const packageJson = __packageJson();

        const publicDir = __SSugarConfig.get('storage.src.publicDir');

        if (__fs.existsSync(`${publicDir}/manifest.json`)) {
            const json = __readJsonSync(`${publicDir}/manifest.json`);
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${publicDir}/manifest.json`, json);
        } else {
            const json = __readJsonSync(
                `${__packageRoot(__dirname())}/src/data/manifest/manifest.json`,
            );
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${publicDir}/manifest.json`, json);
        }

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[manifest]</green> Default <cyan>manifest.json</cyan> file addedd <green>successfully</green>`,
        });

        return true;
    },
};
export default manifestIngredient;
