import { __packagePathSync } from '@coffeekraken/sugar/npm';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen.js';

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
    async add() {
        const packageRoot = __packageRootDir();

        const cliPackagePath = __packagePathSync('@coffeekraken/cli');
        if (!cliPackagePath) return false;

        let nvmrc;
        if (__fs.existsSync(`${cliPackagePath}/.nvmrc`)) {
            nvmrc = __fs.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
            __fs.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);

            console.verbose?.(
                `<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`,
            );
            return true;
        }

        return false;
    },
};
export default nvmrcIngredient;
