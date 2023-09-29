// @ts-nocheck

import __fs from 'fs';

/**
 * @name          packageMetasSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function take a package root path and returns the metas informations from one of these sources:
 * - package.json
 * - composer.json
 *
 * @param     {String}      [path=process.cwd()]      The path of the package to search metas for
 * @return    {Object}          The metas object information containing these data: name, description, version, author and license
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __packageMetasSync($1)
 *
 * @example     js
 * import { __packageMetasSync } from '@coffeekraken/sugar/package';
 * __packageMetasSync();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IPackageMetas {
    type: 'npm' | 'composer';
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
}

export interface IPackageMetasSettings {
    sources: string[];
    fields: string[];
}

export default function __packageMetasSync(
    path = process.cwd(),
    settings?: Partial<IPackageMetasSettings>,
): IPackageMetas {
    const finalSettings: IPackageMetasSettings = {
        sources: ['package.json', 'composer.json'],
        fields: ['name', 'description', 'version', 'author', 'license'],
        ...(settings ?? {}),
    };

    let foundFieldsCount = 0;

    const finalMetas = {};

    for (let source of finalSettings.sources) {
        // if we have already found everything
        // stop here
        if (foundFieldsCount >= finalSettings.fields.length) {
            break;
        }

        // if the file exist, read it and handle fields
        if (__fs.existsSync(`${path}/${source}`)) {
            const json = JSON.parse(
                __fs.readFileSync(`${path}/${source}`).toString(),
            );

            // check every fields to grab info from
            for (let field of finalSettings.fields) {
                if (!finalMetas[field] && json[field] !== undefined) {
                    finalMetas[field] = json[field];
                    foundFieldsCount++;
                }
            }

            // handle the "type" field
            if (source === 'composer.json') {
                finalMetas.type = 'composer';
            } else if (source === 'package.json') {
                finalMetas.type = 'npm';
            } else {
                finalMetas.type = 'unknown';
            }
        }
    }

    // return the metas
    return finalMetas;
}
