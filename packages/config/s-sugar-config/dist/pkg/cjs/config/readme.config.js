"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSztZQUNMLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxZQUFZLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWSxDQUFDO1FBQzdELENBQUM7UUFFRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxjQUFjO2dCQUNkLE9BQU8saURBQWlELENBQUM7WUFDN0QsQ0FBQztTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3hDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWpFRCw0QkFpRUMifQ==