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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1FBQ1IsU0FBUztRQUNULG9CQUFvQjtRQUNwQixvREFBb0Q7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUs7U0FDUjtRQUVELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtTQUNiO1FBRUQsU0FBUyxFQUFFO1lBQ1A7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxVQUFVO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsUUFBUTtZQUVmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsV0FBVztTQUNwQjtLQUNKLENBQUM7QUFDTixDQUFDIn0=