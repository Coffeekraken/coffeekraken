export default function (api) {
    return {
        categories: {
            helperClasses: {
                title: 'Helper classes',
                description: 'All the available helper classes',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*.classes$/',
                },
            },
            helperMixins: {
                title: 'Helper mixins',
                description: 'All the available helper mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin.((?!ui).)*(?<!.classes)$/',
                },
            },
            uiClasses: {
                title: 'UI classes',
                description: 'All the available UI classes',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
                },
            },
            uiMixins: {
                title: 'UI mixins',
                description: 'All the available UI mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
                },
            },
        },
    };
}
