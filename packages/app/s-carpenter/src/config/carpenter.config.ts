export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }

    return {
        server: {
            port: 3001,
        },
        vite: {
            port: 3003,
        },

        namespaces: ['views'],

        scopes: {
            user: {
                name: 'User',
                description: 'Available only on your computer',
                get rootDir() {
                    return `${api.config.storage.package.localDir}/pages`;
                },
            },
            repo: {
                name: 'Repository',
                description: 'Available for every users of this repository',
                get rootDir() {
                    return `${api.config.storage.src.rootDir}/pages`;
                },
            },
        },
    };
}
