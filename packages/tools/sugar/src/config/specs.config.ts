export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        namespaces: {
            'sugar.views': [
                ...(api.config.specs.namespaces?.['sugar.views'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs`,
            ],
            'sugar.bare': [
                ...(api.config.specs.namespaces?.['sugar.bare'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/bare`,
            ],
            'sugar.sections': [
                ...(api.config.specs.namespaces?.['sugar.sections'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/sections`,
            ],
            'sugar.components': [
                ...(api.config.specs.namespaces?.['sugar.components'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/components`,
            ],
        },
    };
}
