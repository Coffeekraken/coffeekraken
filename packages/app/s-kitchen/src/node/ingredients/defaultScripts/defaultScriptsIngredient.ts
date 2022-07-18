import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';
import __recursiveCopy from 'recursive-copy';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        defaultScriptsIngredient
 * @namespace   node.ingredients.defaultScripts
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default scripts like features initialisation, components, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultScriptsIngredient: ISKitchenIngredient = {
    id: 'defaultScripts',
    description:
        'Add default scripts ("<cyan>index.ts</cyan>") to your <magenta>sugar<magenta> project',
    projectTypes: ['sugar', 'unknown'],
    async add({ ask, log, emit, context }) {
        // source file path
        const sourceFilePath = __path.resolve(
            __packageRoot(__dirname()),
            `src/data/defaultScripts`,
        );

        if (
            !context.new &&
            !(await ask({
                type: 'confirm',
                message:
                    'This process will override your current index.ts file if some already exists. Are you ok with that?',
                default: true,
            }))
        ) {
            return false;
        }

        // source views folder path
        const sourceScriptsFolderPath = __path.resolve(
            __path.resolve(__packageRoot(__dirname())),
            `src/data/defaultScripts`,
        );

        const jsDir = __SSugarConfig.get('storage.src.jsDir');

        await __recursiveCopy(sourceScriptsFolderPath, jsDir, {
            overwrite: true,
        });

        return true;
    },
};
export default defaultScriptsIngredient;
