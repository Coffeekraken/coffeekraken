import __SLog from '@coffeekraken/s-log';
import __packagePath from '@coffeekraken/sugar/node/npm/packagePath';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        nvmrcIngredient
 * @namespace   node.ingredients.nvmrc
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the ".nvmrc" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const nvmrcIngredient: ISKitchenIngredient = {
    id: 'nvmrc',
    description: 'Add the default <cyan>.nvmrc</cyan> file into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    async add({ ask, log, emit }) {
        const packageRoot = __packageRoot();

        const cliPackagePath = __packagePath('@coffeekraken/cli');
        if (!cliPackagePath) return false;

        let nvmrc;
        if (__fs.existsSync(`${cliPackagePath}/.nvmrc`)) {
            nvmrc = __fs.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
            __fs.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`,
            });
            return true;
        }

        return false;
    },
};
export default nvmrcIngredient;
