import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        faviconIngredient
 * @namespace   node.ingredients.frontspec
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "frontspec.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const faviconIngredient: ISKitchenIngredient = {
    id: 'favicon',
    projectTypes: ['unknown', 'sugar'],
    async add({ ask, log, emit }) {
        // source file path
        const sourceFilePath = __path.resolve(
            __packageRoot(__dirname()),
            `src/data/favicon/favicon.png`,
        );

        const output = __SSugarConfig.get('faviconBuilder.input');

        // copy the file to his destination
        __copySync(sourceFilePath, output);

        return true;
    },
};
export default faviconIngredient;
