export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        css: {
            extract: false,
        },
    };
}
