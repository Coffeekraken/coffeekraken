export default {
    routes: {
        '/doc/api': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/doc/list'
                }
            }
        }
    }
}