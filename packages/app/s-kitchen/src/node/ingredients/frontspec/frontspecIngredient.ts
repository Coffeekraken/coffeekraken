import __SFrontspec from '@coffeekraken/s-frontspec';
import type { ISKitchenIngredient } from '../../SKitchen.js';

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
    async add() {
        const frontspec = new __SFrontspec();
        await frontspec.build();

        console.verbose?.(
            `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`,
        );

        return true;
    },
};
export default frontspecIngredient;
