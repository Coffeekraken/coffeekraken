// @ts-nocheck

import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs.js';
import __SProcess from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

interface IProcessRunChildOptions {
    processPath: string;
}

(async () => {
    await __SSugarConfig.load();

    const stringArgs =
        process.argv
            .slice(1)
            .map((arg) => {
                if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
                    return `"${arg}"`;
                }
                return arg;
            })
            .join(' ') || '';
    const args: IProcessRunChildOptions = __parseArgs(stringArgs);
    delete args[-1];
    if (!args.settings.processPath) {
        throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
    }

    const settings = Object.assign({}, args.settings);
    const processPath = settings.processPath;
    delete settings.processPath;
    delete args['0'];
    delete args.settings;

    const pro = await __SProcess.from(processPath, {
        process: {
            ...settings,
            runAsChild: false,
        },
    });

    if (pro && pro.run) {
        const proPromise = pro.run(args);
        const res = await proPromise;

        try {
            console.log(JSON.stringify(res.value));
        } catch (e) {
            console.log(res.value?.toString?.() ?? res.value);
        }

        process.exit(0);
    }
})();
