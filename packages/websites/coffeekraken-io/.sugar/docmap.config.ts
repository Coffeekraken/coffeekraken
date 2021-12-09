export default function (env, config) {
    if (env.platform !== 'node') return {};
    return {
        build: {
            // globs: [...(config.docmap.build.globs ?? []), 'something'],
        },
    };
}
