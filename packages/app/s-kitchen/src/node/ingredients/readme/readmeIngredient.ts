import { __copySync } from '@coffeekraken/sugar/fs';
import { __dirname } from '@coffeekraken/sugar/fs';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';

/**
 * @name        readmeIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the base "README.md" file in your src/doc folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const readmeIngredient: ISKitchenIngredient = {
    id: 'readme',
    description:
        'Add the default <cyan>README.md</cyan> file into your project',
    projectTypes: ['unknown', 'sugar'],
    async add({ ask, log, emit }) {
        const input = __SSugarConfig.get('readme.input'),
            output = __SSugarConfig.get('readme.output');

        if (
            __fs.existsSync(input) &&
            !(await ask({
                type: 'confirm',
                message:
                    'A README file already exists. Would you like to override it?',
                default: true,
            }))
        ) {
            return false;
        }

        const sourceReadmePath = __path.resolve(
            __packageRoot(__dirname()),
            'src/data/readme/README.md',
        );

        // copy the file to the project root
        __copySync(sourceReadmePath, input);

        // @TODO            Add the build phase

        // // build source README.md file
        // const builder = new __SMarkdownBuilder();
        // const result = await builder.build({
        //     inPath: __path.resolve(
        //         __packageRoot(__dirname()),
        //         'src/md/README.md',
        //     ),
        //     outPath: finalParams.path,
        // });

        emit('log', {
            value: `<green>[readme]</green> <cyan>${__path.relative(
                __packageRoot(),
                input,
            )}</cyan> added <green>successfully</green>`,
        });

        return true;
    },
};
export default readmeIngredient;
