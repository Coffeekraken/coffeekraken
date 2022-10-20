export default function (api) {
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
