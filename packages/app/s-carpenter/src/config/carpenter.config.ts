export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        server: {
            port: 3001,
        },
        sources: {
            components: {
                title: 'Components',
                specsNamespaces: ['components'],
            },
            sections: {
                title: 'Sections',
                specsNamespaces: ['sections'],
            },
        },
    };
}
