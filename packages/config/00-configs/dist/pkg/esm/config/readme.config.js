export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            input
         * @namespace       config.readme
         * @type            String
         * @default         [config.storage.src.docDir]/README.md
         *
         * Specify where is stored the input README.md file before bein builded using the SMarkdownBuilder class
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.docDir}/README.md.twig`;
        },
        /**
         * @name            output
         * @namespace       config.readme
         * @type            String
         * @default         [config.storage.package.rootDir]/README.md
         *
         * Specify where is stored the output README.md file after bein builded using the SMarkdownBuilder class
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get output() {
            return `${api.config.storage.package.rootDir}/README.md`;
        },
        layout: {
            /**
             * @name            bannerImageUrl
             * @namespace       config.readme.layout
             * @type            String
             * @default         https://cdnv2.coffeekraken.io/global/readme-header.jpg
             *
             * Specify the header image to use for displaying readme. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get bannerImageUrl() {
                return `https://cdnv2.coffeekraken.io/global/readme-header.png`;
            },
        },
        /**
         * @name            shields
         * @namespace       config.readme
         * @type            Object
         * @default         [config.shieldsio.shields]
         *
         * Specify the readme shields to display in your readme.
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shields() {
            return api.config.shieldsio.shields;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLGlCQUFpQixDQUFDO1FBQzdELENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFlBQVksQ0FBQztRQUM3RCxDQUFDO1FBRUQsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksY0FBYztnQkFDZCxPQUFPLHdEQUF3RCxDQUFDO1lBQ3BFLENBQUM7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==