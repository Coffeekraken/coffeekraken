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
