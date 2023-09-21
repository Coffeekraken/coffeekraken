export default function (api) {
    return {
        categories: {
            doc: {
                title: 'Doc',
                description:
                    'All the documentations like install, get started, etc...',
                filters: {
                    type: 'Markdown',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            styleguideComponents: {
                title: 'Styleguide components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            styleguideHelpers: {
                title: 'Styleguide helpers',
                description: 'All the available helpers, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.helpers.*/',
                },
            },
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
            theme: {
                title: 'Theme',
                description: 'All the available theme configs',
                filters: {
                    type: 'Config',
                    id: '@coffeekraken.s-theme.**',
                },
            },
            configs: {
                title: 'Configs',
                description: 'All the available configs',
                filters: {
                    type: 'Config',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
        },
    };
}
