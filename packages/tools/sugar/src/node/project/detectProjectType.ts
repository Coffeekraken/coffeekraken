import __fs from 'fs';

/**
 * @name            detectProjectType
 * @namespace       node.project
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to detect the project type like "next", "nuxt", etc...
 * If the project type is not detected, it will return "generic" for the type and "1.0.0" for the version.
 *
 * @param       {String}            [cwd=process.cwd()]         The root project directory to detect the type from
 * @return      {IDetectProjectTypeResult}                      An object that describe the detected project type
 *
 * @example         js
 * import { __detectProjectType } from '@coffeekraken/sugar/project';
 * __detectProjectType();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDetectProjectTypeResult {
    type: string;
    version: string;
    rawVersion: string;
    major: number;
    minor: number;
    fix: number;
}

export default function detectProjectType(
    cwd = process.cwd(),
): IDetectProjectTypeResult {
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

    // detect sugar projects
    if (__fs.existsSync(`${cwd}/sugar.json`)) {
        let sugarVersion;
        for (let [packageName, version] of Object.entries(
            packageJson.dependencies,
        )) {
            if (packageName.match(/^@coffeekraken\//)) {
                sugarVersion = version;
                break;
            }
        }
        if (sugarVersion) {
            return {
                type: 'sugar',
                version: sugarVersion,
                rawVersion: packageJson.dependencies.next,
                major: parseInt(sugarVersion.split('.')[0]),
                minor: parseInt(sugarVersion.split('.')[1]),
                fix: parseInt(sugarVersion.split('.')[2]),
            };
        }
    }

    return {
        type: 'unknown',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
