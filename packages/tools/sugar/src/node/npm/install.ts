import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __isCommandExists } from '@coffeekraken/sugar/is';
import __argsToString from '../../shared/cli/argsToString';
import __spawn from '../process/spawn';

/**
 * @name            install
 * @namespace       node.npm
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function allows you to install the node packages using npm or yarn depending
 * on your settings.
 *
 * @param       {String|String[]}           [packageNames='']       The package(s) you want to install. If not specified, perform a simple `install` process
 * @param       {INpmInstallSettings}           [settings={}]           Some settings to configure your installation
 * @return      {Promise}               A promise resolved or rejected depending on the install command status...
 *
 * @setting         {String}        [cwd=process.cwd()]         The directory where you want to execute the install
 * @setting         {Boolean}        [yarn=true]                Use yarn in priority over npm. Fallback to npm if not available
 * @setting         {Boolean}           [silent=true]           Specify if you want the process to be silent
 * @setting         {Any}           [args={}]                   An object of arguments passed directly to the yarn or npm install command
 *
 * @snippet         __install($1)
 * await __install($1)
 * 
 * @example         js
 * import install from '@coffeekraken/sugar/node/npm/install';
 * await install(); // install all dependencies
 * await install(['@coffeekraken/sugar']); // install just 1 dependency
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface INpmInstallSettings {
    cwd: string;
    manager: 'yarn' | 'npm';
    args: any;
}

export interface INpmInstallResult {}

export default function install(
    packageNames: string | string[] = '',
    settings: Partial<INpmInstallSettings>,
): Promise<INpmInstallResult> {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        settings = {
            cwd: process.cwd(),
            manager: __SSugarConfig.get('package.manager'),
            args: {},
            ...settings,
        };
        let command;
        if (settings.manager === 'yarn') {
            if (await __isCommandExists('yarn')) {
                command = 'yarn add';
            } else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<magenta>yarn</magenta>" is not available on this system`,
                });
            }
        }
        if (!command) {
            if (await __isCommandExists('npm')) {
                command = 'npm install';
            }
        }
        if (!command) {
            throw new Error(
                `<red>[install]</red> Sorry but it seems that none of "<magenta>npm</magenta>" or "<yellow>yarn</yellow>" are available...`,
            );
        }

        let packagesStr = packageNames;
        if (packageNames) {
            if (!Array.isArray(packagesStr)) {
                packagesStr = [packagesStr];
            }
        }

        // @ts-ignore
        command += ` ${packagesStr.join(' ')} ${__argsToString(
            settings.args,
        )}`.replace(/\s{2,999}/, ' ');

        const result = await pipe(
            __spawn(command, [], {
                cwd: settings.cwd,
            }),
        );

        resolve(result);
    });
}
