import __SLog from '@coffeekraken/s-log';
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
    async add({ ask, log, emit }) {
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[favicon]</yellow> Adding default <cyan>favicon.png</cyan> file...`,
        });

        // source file path
        const sourceFilePath = __path.resolve(
            __packageRoot(__dirname()),
            `src/data/favicon/favicon.png`,
        );

        const output = __SSugarConfig.get('faviconBuilder.input');

        // copy the file to his destination
        __copySync(sourceFilePath, output);

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[favicon]</green> Default <cyan>favicon.png</cyan> file addedd <green>successfully</green>`,
        });

        return true;
    },
};
export default faviconIngredient;
