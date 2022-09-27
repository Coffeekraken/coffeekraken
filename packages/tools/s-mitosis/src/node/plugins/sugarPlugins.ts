import __defaultPropsPlugin from './defaultPropsPlugin';

export default (plugins: string[], targets: string[]) => {
    const pluginsMap = {
        defaultProps: __defaultPropsPlugin,
    };

    const finalConfig = {};

    targets.forEach((target) => {
        if (!finalConfig[target]) {
            finalConfig[target] = {
                plugins: [],
            };
        }

        plugins.forEach((plugin) => {
            let pluginFn = pluginsMap[plugin];
            if (!pluginFn) {
                throw new Error(
                    `The requested "${plugin}" @coffeekraken/s-mitosis plugin does not exists...`,
                );
            }
            finalConfig[target].plugins.push(
                pluginFn({
                    target,
                }),
            );
        });
    });

    return finalConfig;
};
