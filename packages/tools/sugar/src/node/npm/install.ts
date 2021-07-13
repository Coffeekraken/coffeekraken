import __SPromise from '@coffeekraken/s-promise';
import __commandExists from '../command/commandExists';
import __spawn from '../process/spawn';
import __argsToString from '../../shared/cli/argsToString';

/**
 * @name            install
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This function allows you to install the node packages using npm or yarn depending
 * on your settings.
 * 
 * @param       {INpmInstallSettings}           [settings={}]           Some settings to configure your installation
 * @return      {Promise}               A promise resolved or rejected depending on the install command status...
 * 
 * @setting         {String}        [cwd=process.cwd()]         The directory where you want to execute the install
 * @setting         {Boolean}        [yarn=true]                Use yarn in priority over npm. Fallback to npm if not available
 * @setting         {Boolean}           [silent=true]           Specify if you want the process to be silent
 * @setting         {Any}           [args={}]                   An object of arguments passed directly to the yarn or npm install command
 * 
 * @example         js
 * import install from '@coffeekraken/sugar/node/npm/install';
 * await install();
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface INpmInstallSettings {
    cwd: string;
    yarn: boolean;
    args: any;
}

export interface INpmInstallResult {

}

export default function install(settings: Partial<INpmInstallSettings>): Promise<INpmInstallResult> {
    return new __SPromise(async ({resolve, reject, emit}) => {
        settings = {
            cwd: process.cwd(),
            yarn: true,
            args: {},
            ...settings
        }
        let command;
        if (settings.yarn) {
            if (await __commandExists('yarn')) {
                command = 'yarn install';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>yarn</yellow>" to install dependencies`
                });
            } else {
                emit('log', {
                    value: `<yellow>[install]</yellow> Sorry but "<yellow>yarn</yellow>" is not available on this system`
                });
            }
        }
        if (!command) {
            if (await __commandExists('npm')) {
                command = 'npm install';
                emit('log', {
                    value: `<yellow>[install]</yellow> Using to "<yellow>npm</yellow>" to install dependencies`
                });
            }
        }
        if (!command) {
            throw new Error(`<red>[install]</red> Sorry but it seems that none of "<yellow>npm</yellow>" or "<yellow>yarn</yellow>" are available...`);
        }

        command += ` ${__argsToString(settings.args)}`;

        const result = await __spawn(command, [], {
            cwd: settings.cwd
        });

        resolve(result);

    });
}