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
            return `${api.config.storage.src.docDir}/README.md`;
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
             * @name            headerImageUrl
             * @namespace       config.readme.layout
             * @type            String
             * @default         https://cdnv2.coffeekraken.io/readme-header.jpg
             *
             * Specify the header image to use for displaying readme. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get headerImageUrl() {
                return `https://cdnv2.coffeekraken.io/readme-header.png`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFlBQVksQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxZQUFZLENBQUM7UUFDN0QsQ0FBQztRQUVELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLGNBQWM7Z0JBQ2QsT0FBTyxpREFBaUQsQ0FBQztZQUM3RCxDQUFDO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDeEMsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=