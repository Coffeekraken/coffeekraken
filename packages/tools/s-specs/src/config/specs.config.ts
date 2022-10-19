export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        namespaces: {},
        get cwd() {
            return api.config.storage.rootDir;
        },
    };
}
