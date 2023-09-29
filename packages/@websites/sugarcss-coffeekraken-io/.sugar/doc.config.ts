export default function (api) {
    return {
        categories: {
            getStarted: {
                title: 'Get Started',
                description:
                    'All the documentations like install, get started, etc...',
                filters: {
                    type: 'Markdown',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            styleguideComponents: {
                title: 'Components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            styleguideHelpers: {
                title: 'Helpers',
                description: 'All the available helpers, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.helpers.*/',
                },
            },
            mixins: {
                title: 'Mixins',
                description: 'All the available mixins',
                filters: {
                    type: 'PostcssMixin',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            functions: {
                title: 'Functions',
                description: 'All the available functions',
                filters: {
                    type: 'PostcssFunction',
                    id: '@coffeekraken.s-postcss-sugar-plugin.**',
                },
            },
            // uiClasses: {
            //     title: 'UI classes',
            //     description: 'All the available UI classes',
            //     filters: {
            //         type: 'PostcssMixin',
            //         id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*.classes$/',
            //     },
            // },
            // uiMixins: {
            //     title: 'UI mixins',
            //     description: 'All the available UI mixins',
            //     filters: {
            //         type: 'PostcssMixin',
            //         id: '/@coffeekraken.s-postcss-sugar-plugin..*.ui..*(?<!.classes)$/',
            //     },
            // },
            theming: {
                title: 'Theming',
                description: 'All the available theming configs',
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
