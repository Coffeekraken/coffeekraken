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
    rawVersion: string;
    major: number;
    minor: number;
    fix: number;
}

export default function detectType(cwd = process.cwd()): IDetectTypeResult {
    const packageJson = JSON.parse(
        __fs.readFileSync(`${cwd}/package.json`, 'utf8').toString(),
    );

    // detecting the package type (next, generic, etc...)
    if (__fs.existsSync(`${cwd}/next.config.js`)) {
        const version = packageJson.dependencies.next.replace(/\^/, '');

        return {
            type: 'next',
            version,
            rawVersion: packageJson.dependencies.next,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    return {
        type: 'generic',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
