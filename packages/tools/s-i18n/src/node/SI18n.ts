// @ts-nocheck

import __SDuration from '@coffeekraken/s-duration';
import __SI18n from '../shared/SI18n';

import __SI18nExtractParamsInterface from './interface/SI18nExtractParamsInterface';

import __ts from 'typescript';

import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';

import __path from 'path';

import __SGlob from '@coffeekraken/s-glob';

/**
 * @name                SI18n
 * @namespace           node
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class allows you to handle translations (i18n) easily and elegantly.
 * It works in node as well as in the browser.
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __SI18n()
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @example             js
 * import __SI18n from '@coffeekraken/s-si18n';
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISI18nExtractParams {
    glob: string;
    outDir: string;
    fileName: string;
}

export interface ISI18nExtractResult {}

export default class SI18n extends __SI18n {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        super(__deepMerge({}, settings));
    }

    /**
     * @name            extract
     * @type            Function
     * @async
     *
     * This async method allows you to extract all the translations from your codebase.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    extract(
        params: Partial<ISI18nExtractParams>,
    ): Promise<ISI18nExtractResult> {
        return new Promise(async (resolve, reject) => {
            const finalParams: ISI18nExtractParams =
                __SI18nExtractParamsInterface.apply(params);

            const duration = new __SDuration();

            console.log(
                `<yellow>[extract]</yellow> i18n extraction starting...`,
            );

            const files = __SGlob.resolveSync(finalParams.glob, {
                cwd: __packageRootDir(),
            });

            console.log(
                `<yellow>[extract]</yellow> <cyan>${files.length}</cyan> file${
                    files.length > 1 ? 's' : ''
                } found`,
            );

            let i18n = {};

            // recursive function that process each nodes
            function delintNode(node: __ts.Node) {
                if (node.kind === __ts.SyntaxKind.CallExpression) {
                    let text = node.getFullText().trim();
                    if (text.startsWith('__i18n')) {
                        // make sure that the text is not on the same line as the
                        const id = text.match(/id:\s?('|"|`)(.+)('|"|`)/)?.[2],
                            string = node.arguments[0].text;

                        // set the translation in the i18n object
                        i18n[id ?? string] = string;
                    }
                }

                // process every child nodes
                __ts.forEachChild(node, delintNode);
            }

            // loop on each founded files to process them
            files.forEach((file) => {
                const sourceFile = __ts.createSourceFile(
                    'foo.ts',
                    file.raw,
                    __ts.ScriptTarget.ES5,
                    true,
                );
                delintNode(sourceFile);
            });

            // sort the i18n by keys
            i18n = __sort(i18n);

            // writing the file on the disk
            __writeJsonSync(
                `${finalParams.outDir}/${finalParams.fileName}`,
                i18n,
            );

            console.log(
                `<green>[extract]</green> i18n extraction complete <green>successfully</green> in <yellow>${
                    duration.end().formatedDuration
                }</yellow>!`,
            );
            console.log(
                `<green>[extract]</green> Your i18n file has been saved here "<cyan>${__path.relative(
                    __packageRootDir(),
                    `${finalParams.outDir}/${finalParams.fileName}`,
                )}</cyan>"`,
            );

            resolve();
        });
    }
}
