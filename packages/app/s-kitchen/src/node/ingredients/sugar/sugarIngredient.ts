import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import type { ISKitchenIngredient } from '../../SKitchen';

/**
 * @name        sugarIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the sugar toolkit integration into your project. It will:
 *
 * 1. Install the toolkit
 * 2. Create some base files
 * 3. Add support for "pleasant css syntax"
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarIngredient: ISKitchenIngredient = {
    id: 'sugar',
    description:
        'Add the <yellow>@coffeekraken/sugar</yellow> package to your project',
    projectTypes: ['unknown', 'sugar'],
    async add({ ask, log, emit, pipe, context }) {
        const rootPath = __packageRoot(process.cwd());

        // installing the actual package
        emit('log', {
            value: `<yellow>sugar</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
        });
        try {
            await pipe(__npmInstall('@coffeekraken/sugar'));
        } catch (e) {
            emit('log', {
                value: `<red>sugar</red> Something went wrong when installing the @coffeekraken/sugar package. Please try to install it manually.`,
            });
        }

        // pleasant css syntax
        if (
            await ask({
                type: 'confirm',
                message: `Add the <yellow>pleasant css syntax</yellow> support`,
                default: true,
            })
        ) {
            // @TODO            Finish next integration and add "generic" one

            switch (context.projectType.type) {
                case 'next':
                    // adding the js needed
                    __fs.writeFileSync(
                        `${rootPath}/pages/_sugar.ts`,
                        [
                            `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                            `if (typeof window === 'object') {`,
                            `   __expandPleasantCssClassnamesLive();`,
                            `}`,
                        ].join('\n'),
                    );
                    // adding the≤ import in the _app.tsx file
                    __prependToFileSync(
                        `${rootPath}/pages/_app.tsx`,
                        ["import './_sugar';"].join('\n'),
                    );
                    break;
            }
        }

        emit('log', {
            value: `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`,
        });

        return true;
    },
};
export default sugarIngredient;
