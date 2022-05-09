import __semverParser from 'semver/functions/parse';

/**
 * @name          parseSemverString
 * @namespace            js.semver
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * Parse a semver string and return a semver object using the nice [semver](https://github.com/npm/node-semver) parser.
 *
 * @param       {String}       semverString      The semver string to parse
 * @return      {ISemverObject}          The parsed semver object
 *
 * @example       js
 * import __parseSemverString from '@coffeekraken/sugar/shared/semver/parseSemverString';
 * __parseSemverString('2.3.1);
 * // {
 * //    options: {},
 * //    loose: false,
 * //    includePrerelease: false,
 * //    raw: '2.3.1',
 * //    major: 2,
 * //    minor: 3,
 * //    patch: 1,
 * //    prerelease: [],
 * //    build: [],
 * //    version: '2.3.1',
 * // }
 *
 * @see         https://github.com/npm/node-semver
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISemverObject {
    options: any;
    loose: boolean;
    includePrerelease: boolean;
    raw: string;
    major: number;
    minor: number;
    patch: number;
    prerelease: string[];
    build: string[];
    version: string;
}

export default function parseSemverString(semverString: string): ISemverObject {
    const obj = __semverParser(semverString);
    return obj;
}
