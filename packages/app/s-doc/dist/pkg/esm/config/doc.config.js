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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0gsVUFBVSxFQUFFO1FBQ1IsU0FBUztRQUNULG9CQUFvQjtRQUNwQixvREFBb0Q7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUs7U0FDUjtRQUVELFNBQVMsRUFBRTtZQUNQOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsVUFBVTtZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxLQUFLO2dCQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQztZQUN6QyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDO1lBQ25DLENBQUM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=