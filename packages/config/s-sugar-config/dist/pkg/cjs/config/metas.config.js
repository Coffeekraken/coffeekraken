"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
function default_1(api) {
    return {
        /**
         * @name            lang
         * @namespace       config.metas
         * @type            String
         * @default         en
         *
         * Specify the lang of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        lang: 'en',
        /**
         * @name            title
         * @namespace       config.metas
         * @type            String
         * @default         config.packageJson.title ?? config.packageJson.name
         *
         * Specify the title of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get title() {
            var _a;
            return (_a = api.config.packageJson.title) !== null && _a !== void 0 ? _a : api.config.packageJson.name;
        },
        /**
         * @name            homepage
         * @namespace       config.metas
         * @type            String
         * @default         config.packageJson.homepage
         *
         * Specify the homepage url of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get homepage() {
            return api.config.packageJson.homepage;
        },
        /**
         * @name            description
         * @namespace       config.metas
         * @type            String
         * @default         config.packageJson.description
         *
         * Specify the description of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get description() {
            return api.config.packageJson.description;
        },
        /**
         * @name            themeColor
         * @namespace       config.metas
         * @type            String
         * @default         theme.color.accent
         *
         * Specify the theme main color of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get themeColor() {
            return api.theme.color.accent;
        },
        /**
         * @name            author
         * @namespace       config.metas
         * @type            String
         * @default         config.packageJson.author
         *
         * Specify the author of the project.
         * Must be an object with the "name", "email" and "url" properties
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get author() {
            let author = api.config.packageJson.author;
            if (typeof author === 'string') {
                author = (0, package_1.__parseAuthorString)(author);
            }
            return author;
        },
        /**
         * @name            ob
         * @namespace       config.metas
         * @type            String
         * @default         config.packageJson.author
         *
         * Specify the opengraph metas for the project
         * Must be an object with the "title", "description", "type", "url" and "image" properties
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get og() {
            return {
                title: api.this.title,
                description: api.this.description,
                type: 'website',
                url: api.this.homepage,
                image: 'https://cdnv2.coffeekraken.io/coffeekraken-og.png',
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWtFO0FBRWxFLG1CQUF5QixHQUFHO0lBQ3hCLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLOztZQUNMLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN2RSxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQzNDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxXQUFXO1lBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFVBQVU7WUFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLE1BQU07WUFDTixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDM0MsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxJQUFBLDZCQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTztnQkFDSCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNyQixXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNqQyxJQUFJLEVBQUUsU0FBUztnQkFDZixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUN0QixLQUFLLEVBQUUsbURBQW1EO2FBQzdELENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFySEQsNEJBcUhDIn0=