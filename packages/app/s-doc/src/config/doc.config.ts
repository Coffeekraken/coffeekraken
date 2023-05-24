export default function (api) {
    return {
        categories: {
            // all: {
            //     title: 'All',
            //     description: 'Access all API documentations',
            //     filters: {},
            // },
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
             * @default         %base/items/:filters
             *
             * Enpoint where to get a category items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get items() {
                return `${this.base}/items/:filters`;
            },

            /**
             * @name        item
             * @namespace   config.doc.endpoints
             * @type        String
             * @default         %base/item/:id
             *
             * Enpoint where to get an actual documentation informations
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get item() {
                return `${this.base}/item/:id`;
            },
        },
    };
}
