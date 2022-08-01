export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        css: {
            extract: false,
        },
    };
}
