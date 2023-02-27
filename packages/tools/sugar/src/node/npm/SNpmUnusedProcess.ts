import _SInterface from '@coffeekraken/s-interface';
import __SProcess, { ISProcessSettings } from '@coffeekraken/s-process';
import __SPromise from '@coffeekraken/s-promise';
import __depCheck from 'depcheck';
import __packageRootDir from '../path/packageRootDir';
import __packageJsonSync from './packageJsonSync';

/**
 * @name            SNpmUnusedProcess
 * @namespace            node.npm
 * @type            Class
 * @extends         SProcess
 * @platform        node
 * @status          beta
 * @private
 *
 * This process is used to check npm unused dependencies, remove unsused once, etc...
 * It use under the hood the amazing depcheck package made by @rumpl and @lijunle
 *
 * @see             https://www.npmjs.com/package/depcheck
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

interface ISNpmUnusedProcessSettings extends ISProcessSettings {}
interface ISNpmUnusedProcessParams {
    clean: boolean;
    skipMissing: boolean;
    skipDev: boolean;
}
interface ISNpmUnusedProcess {}

export class SNpmUnusedParamsInterface extends _SInterface {
    static get _definition() {
        return {
            clean: {
                type: 'Boolean',
                alias: 'r',
                description:
                    'Specify if you want the found unused dependencies to be reflected back into the package.json file',
                default: false,
            },
            skipDev: {
                type: 'Boolean',
                description:
                    'Specify if you want to skip the "devDependencies" check',
                default: false,
            },
            skipMissing: {
                type: 'Boolean',
                description:
                    'Specify if you want to skip the missing packages check',
                default: false,
            },
        };
    }
}

// @ts-ignore
class SNpmUnusedProcess extends __SProcess implements ISNpmUnusedProcess {
    /**
     * @name        constructor
     * @type         Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        initialParams = {},
        settings?: Partial<ISNpmUnusedProcessSettings>,
    ) {
        super(initialParams, settings ?? {});
    }

    /**
     * @name        process
     * @type        Function
     *
     * Actual process execution
     *
     * @param       {Partial<ISNpmUnusedProcessParams>}        [params={}]         Params for the execution
     * @param       {Partial<ISNpmUnusedProcessSettings>}         [settings={}]           Some settings to override
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    process(
        params?: Partial<ISNpmUnusedProcessParams>,
        settings?: Partial<ISNpmUnusedProcessSettings>,
    ) {
        return new __SPromise(async ({ resolve, reject, emit }) => {
            const finalParams = SNpmUnusedParamsInterface.apply(params);

            // starting dependencies checking
            const unusedDepJson = await __depCheck(__packageRootDir(), {
                // @ts-ignore
                skipMissing: finalParams.skipMissing,
            });

            // Listing the unused deps
            const unusedListArray: any[] = [];

            if (unusedDepJson.dependencies) {
                unusedDepJson.dependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJsonSync(dep);
                    unusedListArray.push({
                        group: 'dependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license,
                    });
                });
            }

            // @ts-ignore
            if (!finalParams.skipDev && unusedDepJson.devDependencies) {
                unusedDepJson.devDependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJsonSync(dep);
                    unusedListArray.push({
                        group: 'devDependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license,
                    });
                });
            }

            // display list
            const listArray: string[] = unusedListArray.map((depObj) => {
                return `<${depObj.group === 'dependency' ? 'green' : 'red'}>[${
                    depObj.group
                }]</${depObj.group === 'dependency' ? 'green' : 'red'}> ${
                    depObj.license
                } <yellow>${depObj.name}</yellow> <cyan>${
                    depObj.version
                }</cyan>`;
            });

            await emit('log', {
                value: listArray.join('\n'),
            });

            const res = await emit('ask', {
                type: 'boolean',
                message: 'Would you like to clean the dependencies?',
                default: true,
            });

            if (res) {
                console.log('process!!!');
            }

            resolve(true);
        });
    }
}

export default SNpmUnusedProcess;
