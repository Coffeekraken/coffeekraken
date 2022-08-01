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
