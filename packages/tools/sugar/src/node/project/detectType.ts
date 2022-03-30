import __fs from 'fs';

/**
 * @name            detectType
 * @namespace       node.php
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to detect the project type like "next", "nuxt", etc...
 * If the project type is not detected, it will return "generic" for the type and "1.0.0" for the version.
 *
 * @return          {}
 *
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDetectTypeResult {
    type: string;
    version: string;
}

export default function detectType(cwd = process.cwd()): IDetectTypeResult {
    // detecting the package type (next, generic, etc...)
    if (__fs.existsSync(`${cwd}/next.config.js`)) {
        const packageJson = JSON.parse(
            __fs.readFileSync(`${cwd}/package.json`, 'utf8').toString(),
        );
        return {
            type: 'next',
            version: packageJson.dependencies.next,
        };
    }
    return {
        type: 'generic',
        version: '1.0.0',
    };
}
