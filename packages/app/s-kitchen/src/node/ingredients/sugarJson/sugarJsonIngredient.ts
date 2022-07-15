import __SLog from '@coffeekraken/s-log';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        sugarJsonIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarJsonIngredient: ISKitchenIngredient = {
    id: 'sugarJson',
    projectTypes: ['*'],
    async add({ ask, log, emit, context }) {
        const packageRoot = __packageRoot();

        if (__fs.existsSync(`${packageRoot}/sugar.json`)) {
            const json = __readJsonSync(`${packageRoot}/sugar.json`);
            json.recipe = context.recipe ?? 'generic';
            __writeJsonSync(`${packageRoot}/sugar.json`, json);
        } else {
            __writeJsonSync(`${packageRoot}/sugar.json`, {
                recipe: context.recipe ?? 'generic',
            });
        }

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[sugarJson]</yellow> "<cyan>sugar.json</cyan>" file added <green>successfully</green> with the recipe <cyan>generic</cyan>`,
        });

        return true;
    },
};
export default sugarJsonIngredient;
