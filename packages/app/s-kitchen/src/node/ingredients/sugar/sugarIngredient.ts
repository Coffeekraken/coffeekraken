import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';
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
    projectTypes: ['unknown', 'sugar', 'next'],
    async add({ ask, log, emit, pipe, context }) {
        const rootPath = __packageRoot(process.cwd()),
            thisPackageRootPath = __packageRoot(__dirname());

        // installing the actual package
        emit('log', {
            value: `<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`,
        });
        try {
            await pipe(
                __npmInstall([
                    '@coffeekraken/sugar',
                    '@coffeekraken/s-sugar-feature',
                ]),
            );
        } catch (e) {
            emit('log', {
                value: `<red>sugar</red> Something went wrong when installing the @coffeekraken packages. Please try to install it manually.`,
            });
        }

        switch (context.projectType.type) {
            case 'next':
                // creating the file
                __copySync(
                    __path.resolve(
                        thisPackageRootPath,
                        'src/data/sugar/sugar.ts',
                    ),
                    __path.resolve(rootPath, 'pages/_sugar.ts'),
                );

                // adding the≤ import in the _app.tsx file
                __prependToFileSync(
                    `${rootPath}/pages/_app.tsx`,
                    ["import './_sugar';"].join('\n'),
                );
                break;
            case 'generic':
            default:
                // creating the file
                __copySync(
                    __path.resolve(
                        thisPackageRootPath,
                        'src/data/sugar/sugar.ts',
                    ),
                    __path.resolve(
                        __SSugarConfig.get('storage.src.jsDir'),
                        'sugar.ts',
                    ),
                );

                // adding the≤ import in the _app.tsx file
                __prependToFileSync(
                    `${__SSugarConfig.get('storage.src.jsDir')}/index.ts`,
                    ["import './sugar';"].join('\n'),
                );

                break;
        }

        emit('log', {
            value: `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`,
        });

        return true;
    },
};
export default sugarIngredient;
