"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNILFVBQVUsRUFBRTtRQUNSLFNBQVM7UUFDVCxvQkFBb0I7UUFDcEIsb0RBQW9EO1FBQ3BELG1CQUFtQjtRQUNuQixLQUFLO1NBQ1I7UUFFRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7U0FDYjtRQUVELFNBQVMsRUFBRTtZQUNQOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsVUFBVTtZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFFBQVE7WUFFZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFdBQVc7U0FDcEI7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWxFRCw0QkFrRUMifQ==