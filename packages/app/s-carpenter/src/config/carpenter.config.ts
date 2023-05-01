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

        categories: {
            bare: {
                name: 'Bare',
                description:
                    'All the components that are helpful the the page structure like layout, container, etc...',
            },
            sections: {
                name: 'Sections',
                description: 'All the available pre-build sections',
            },
            components: {
                name: 'Components',
                description:
                    'All the available components that you can use to create custom sections',
            },
        },

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

        sources: {
            components: {
                title: 'Components',
                specsNamespaces: ['views.components'],
            },
            sections: {
                title: 'Sections',
                specsNamespaces: ['views.sections'],
            },
        },
    };
}
