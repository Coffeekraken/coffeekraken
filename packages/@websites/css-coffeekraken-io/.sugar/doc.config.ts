export default function (api) {
    return {
        categories: {
            helpers: {
                title: 'Helpers',
                description: 'All the available helpers',
                children: {
                    mixins: {
                        title: 'Mixins',
                        description: 'All the available helper mixins',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*(?<!.classes)$/',
                        },
                    },
                    classes: {
                        title: 'Classes',
                        description: 'All the available helper classes',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*.classes$/',
                        },
                    },
                },
            },
            ui: {
                title: 'UI',
                description: 'All the available UI elements',
                children: {
                    mixins: {
                        title: 'Mixins',
                        description: 'All the available UI mixins',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
                        },
                    },
                    classes: {
                        title: 'Classes',
                        description: 'All the available UI classes',
                        filters: {
                            type: 'PostcssMixin',
                            id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
                        },
                    },
                },
            },
        },
    };
}
