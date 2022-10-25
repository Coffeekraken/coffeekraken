export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        namespaces: {
            'sugar.views': [
                ...(api.config.specs.namespaces?.['sugar.views'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs`,
            ],
            'sugar.views.bare': [
                ...(api.config.specs.namespaces?.['sugar.views.bare'] ?? []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/bare`,
            ],
            'sugar.views.sections': [
                ...(api.config.specs.namespaces?.['sugar.views.sections'] ??
                    []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/sections`,
            ],
            'sugar.views.components': [
                ...(api.config.specs.namespaces?.['sugar.views.components'] ??
                    []),
                `./node_modules/@coffeekraken/sugar/src/views/_specs/components`,
            ],
        },
    };
}
