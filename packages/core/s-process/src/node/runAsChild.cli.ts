// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __parseArgs } from '@coffeekraken/sugar/cli';

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
        ...settings,
        runAsChild: false,
    });

    if (pro && pro.run) {
        const proPromise = pro.run(args);
        const res = await proPromise;

        let json;

        try {
            json = JSON.stringify(res.value);
        } catch (e) {}

        if (json) {
            console.log(json);
        }

        process.exit(0);
    }
})();
