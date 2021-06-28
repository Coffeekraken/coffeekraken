export default {
    routes: {
        '/doc': {
            handler: 'view',
            request: {
                params: {
                    '0': 'pages/doc/list'
                }
            }
        }
    }
}