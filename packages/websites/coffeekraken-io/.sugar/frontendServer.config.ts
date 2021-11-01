export default {
    routes: {
        '/config/explorer/*': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/config/explorer',
                },
            },
        },
        '/config/explorer': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/config/explorer',
                },
            },
        },
        '/doc/api': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/doc/list',
                },
            },
        },
    },
};
