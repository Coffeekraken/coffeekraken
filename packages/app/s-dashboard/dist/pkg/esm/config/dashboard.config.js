export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxNQUFNLEVBQUU7WUFDSixDQUFDLG1CQUFtQixDQUFDO1lBQ3JCO2dCQUNJLDBCQUEwQjtnQkFDMUIsb0JBQW9CO2dCQUNwQix3QkFBd0I7Z0JBQ3hCLHdCQUF3QjthQUMzQjtZQUNELENBQUMscUJBQXFCLEVBQUUsOEJBQThCLENBQUM7U0FDMUQ7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9