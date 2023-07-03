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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNILFVBQVUsRUFBRTtRQUNSLFNBQVM7UUFDVCxvQkFBb0I7UUFDcEIsb0RBQW9EO1FBQ3BELG1CQUFtQjtRQUNuQixLQUFLO1NBQ1I7UUFFRCxTQUFTLEVBQUU7WUFDUDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFVBQVU7WUFFaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksS0FBSztnQkFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUM7WUFDekMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLElBQUk7Z0JBQ0osT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQztZQUNuQyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXZERCw0QkF1REMifQ==