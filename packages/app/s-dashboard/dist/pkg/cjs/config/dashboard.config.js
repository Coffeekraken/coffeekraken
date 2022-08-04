"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        /**
         * @name            layout
         * @namespace       config.dashboard
         * @type            Array<String[]>
         * @default        [['s-dashboard-pages'], [], ['s-dashboard-frontend-checker']],
         *
         * Specify the layout you want for your dashboard.
         * First level defined the columns, second level defined the components in each column.
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        layout: [
            ['s-dashboard-pages'],
            [
                's-dashboard-browserstack',
                's-dashboard-google',
                's-dashboard-web-vitals',
                's-dashboard-responsive',
            ],
            ['s-dashboard-project', 's-dashboard-frontend-checker'],
        ],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsTUFBTSxFQUFFO1lBQ0osQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQjtnQkFDSSwwQkFBMEI7Z0JBQzFCLG9CQUFvQjtnQkFDcEIsd0JBQXdCO2dCQUN4Qix3QkFBd0I7YUFDM0I7WUFDRCxDQUFDLHFCQUFxQixFQUFFLDhCQUE4QixDQUFDO1NBQzFEO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF6QkQsNEJBeUJDIn0=