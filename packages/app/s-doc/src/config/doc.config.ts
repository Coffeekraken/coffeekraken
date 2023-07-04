export default function (api) {
    return {
        categories: {
            // all: {
            //     title: 'All',
            //     description: 'Access all API documentations',
            //     filters: {},
            // },
        },

        server: {
            /**
             * @name        port
             * @namespace   config.doc.server
             * @type        String
             * @default         /api/doc
             *
             * The server port
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 9191,
        },

        endpoints: {
            /**
             * @name        base
             * @namespace   config.doc.endpoints
             * @type        String
             * @default         /api/doc
             *
             * Base api url available in the others using the %base token
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            base: '/api/doc',

            /**
             * @name        items
             * @namespace   config.doc.endpoints
             * @type        String
             * @default         items
             *
             * Enpoint where to get a category items. This must be a POST request with the filters stringified JSON as body
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            items: `/items`,

            /**
             * @name        item
             * @namespace   config.doc.endpoints
             * @type        String
             * @default         item/:id
             *
             * Enpoint where to get an actual documentation informations
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            item: '/item/:id',
        },
    };
}
