import type { ISKitchenIngredient } from '../../SKitchen';

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

/**
 * @name        defaultPackageJsonIngredient
 * @namespace   node.ingredients.defaultPackageJson
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default package.json scripts, dependencies, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultPackageJsonIngredient: ISKitchenIngredient = {
    id: 'defaultPackageJson',
    description:
        'Apply the <yellow>config.package.defaultPackageJson</yellow> object on your <cyan>package.json</cyan> file',
    projectTypes: ['unknown', 'sugar'],
    async add({ ask, log, context }) {
        const packageRoot = __packageRootDir();

        let json = {};
        if (__fs.existsSync(`${packageRoot}/package.json`)) {
            json = JSON.parse(
                __fs.readFileSync(`${packageRoot}/package.json`).toString(),
            );
        }

        json = __deepMerge(
            json,
            __SSugarConfig.get('package.defaultPackageJson') ?? {},
        );

        __fs.writeFileSync(
            `${packageRoot}/package.json`,
            JSON.stringify(json, null, 4),
        );

        return true;
    },
};
export default defaultPackageJsonIngredient;
