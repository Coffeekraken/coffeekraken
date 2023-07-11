// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __parseArgs from '../../shared/cli/parseArgs.js';

interface IProcessRunChildOptions {
    processPath: string;
}

export default async (stringArgs = '') => {
    const args: IProcessRunChildOptions = __parseArgs(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const { default: ProcessClass } = await import(args.processPath);
    if (ProcessClass.prototype instanceof __SProcess) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
};
