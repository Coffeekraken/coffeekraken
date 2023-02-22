// @ts-nocheck

import __fs from 'fs';

/**
 * @name          packageMetas
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
 * @example     js
 * import { __packageMetas } from '@coffeekraken/sugar/package';
 * __packageMetas();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IPackageMetas {
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

export default function __packageMetas(
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
        }
    }

    // return the metas
    return finalMetas;
}
