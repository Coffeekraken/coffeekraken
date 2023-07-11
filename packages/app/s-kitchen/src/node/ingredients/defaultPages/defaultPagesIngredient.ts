import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __recursiveCopy from 'recursive-copy';
import type { ISKitchenIngredient } from '../../SKitchen.js';

/**
 * @name        defaultPagesIngredient
 * @namespace   node.ingredients.defaultPages
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default pages and views like index, 404, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultPagesIngredient: ISKitchenIngredient = {
    id: 'defaultPages',
    description:
        'Add default pages like index, 404, etc in a <magenta>sugar</magenta> project',
    projectTypes: ['sugar'],
    async add({ ask, log, context }) {
        // source file path
        const sourceFilePath = __path.resolve(
            __packageRootDir(__dirname()),
            `src/data/defaultPages`,
        );

        if (
            !context.new &&
            !(await ask({
                type: 'confirm',
                message:
                    'This process will override your current pages/views if some already exists and match with the default pages/views that will be added. Are you ok with that?',
                default: true,
            }))
        ) {
            return false;
        }

        const engine = await ask({
            type: 'select',
            message: 'Which view engine would you like to use?',
            choices: ['twig'],
            default: 'twig',
        });

        // source views folder path
        const sourceViewsFolderPath = __path.resolve(
            __path.resolve(__packageRootDir(__dirname())),
            `src/data/defaultPages/${engine}/views`,
        );
        // source pages folder path
        const sourcePagesFolderPath = __path.resolve(
            __path.resolve(__packageRootDir(__dirname())),
            `src/data/defaultPages/${engine}/pages`,
        );

        const pagesDir = __SSugarConfig.get('storage.src.pagesDir'),
            viewsDir = __SSugarConfig.get('storage.src.viewsDir');

        const pagesResult = await __recursiveCopy(
            sourcePagesFolderPath,
            pagesDir,
            {
                overwrite: true,
            },
        );
        const viewsResult = await __recursiveCopy(
            sourceViewsFolderPath,
            viewsDir,
            {
                overwrite: true,
            },
        );

        return true;
    },
};
export default defaultPagesIngredient;
