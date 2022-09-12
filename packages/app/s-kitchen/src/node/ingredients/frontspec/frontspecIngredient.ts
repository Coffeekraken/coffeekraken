import __SLog from '@coffeekraken/s-log';
import { __copySync } from '@coffeekraken/sugar/fs';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        frontspecIngredient
 * @namespace   node.ingredients.frontspec
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "frontspec.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const frontspecIngredient: ISKitchenIngredient = {
    id: 'frontspec',
    description:
        'Add the default <cyan>frontspec.json</cyan> file into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar'],
    async add({ ask, log, emit }) {
        const frontspecPath = `${__packageRootDir()}/frontspec.json`;
        const sourceJsonPath = __path.resolve(
            __packageRootDir(__dirname()),
            'src/data/frontspec/frontspec.json',
        );

        // copy the file to the project root
        __copySync(sourceJsonPath, frontspecPath);

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`,
        });

        return true;
    },
};
export default frontspecIngredient;
