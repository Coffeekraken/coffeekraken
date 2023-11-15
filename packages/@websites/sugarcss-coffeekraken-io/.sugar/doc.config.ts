export default function (api) {
    return {
        categories: {
            getStarted: {
                title: 'Get Started',
                description:
                    'All the documentations like install, get started, etc...',
                filters: {
                    type: 'Markdown',
                    id: '@website.sugarcss-coffeekraken-io.doc.**',
                },
            },
            components: {
                title: 'Components',
                description: 'All the available components, etc...',
                filters: {
                    type: 'Styleguide',
                    id: '/.*.sugar.style.ui.*/',
                },
            },
            helpers: {
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
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
            functions: {
                title: 'Functions',
                description: 'All the available functions',
                filters: {
                    type: 'PostcssFunction',
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
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
                    id: '@coffeekraken.s-sugarcss-plugin.**',
                },
            },
        },
    };
}
