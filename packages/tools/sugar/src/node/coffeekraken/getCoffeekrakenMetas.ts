import __fs from 'fs';
import __path from 'path';
import __parseSemverString, {
    ISemverObject,
} from '../../shared/semver/parseSemverString';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';

/**
 * @name            getCoffeekrakenMetas
 * @namespace       node.coffeekraken
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function will returns you the coffeekraken metas object containing things like:
 * - version: The version of the coffeekraken stack used
 *
 * @return          {ICoffeekrakenMetas}                The coffeekraken metas object
 *
 * @example         js
 * import { __getCoffeekrakenMetas } from '@coffeekraken/sugar/coffeekraken';
 * await __getCoffeekrakenMetas();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ICoffeekrakenMetas {
    version: ISemverObject;
}

export default function getCoffeekrakenMetas(): ICoffeekrakenMetas {
    const packageJsonPath = __path.resolve(
        __packageRootDir(__dirname()),
        'package.json',
    );
    if (!__fs.existsSync(packageJsonPath)) {
        throw new Error(
            `Cannot find the package.json fule to get the coffeekraken metas`,
        );
    }

    const json = __readJsonSync(packageJsonPath);

    return {
        version: __parseSemverString(json.version),
    };
}
