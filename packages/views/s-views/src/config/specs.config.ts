export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        namespaces: {
            // 'sugar.views': [
            //     ...(api.config.specs.namespaces?.['sugar.views'] ?? []),
            //     __path.resolve(`${__dirname()}/../../../../src/views`),
            // ],
        },
    };
}
