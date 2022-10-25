export default function (api) {
    return {
        server: {
            port: 3001,
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
