"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
function default_1(api) {
    if (api.env.platform !== 'node') {
        return;
    }
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
         * @default         config.package.json.title ?? config.package.json.name
         *
         * Specify the title of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get title() {
            var _a;
            return ((_a = api.config.package.json.title) !== null && _a !== void 0 ? _a : api.config.package.json.name);
        },
        /**
         * @name            homepage
         * @namespace       config.metas
         * @type            String
         * @default         config.package.json.homepage
         *
         * Specify the homepage url of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get homepage() {
            return api.config.package.json.homepage;
        },
        /**
         * @name            description
         * @namespace       config.metas
         * @type            String
         * @default         config.package.json.description
         *
         * Specify the description of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get description() {
            return api.config.package.json.description;
        },
        /**
         * @name            keywords
         * @namespace       config.metas
         * @type            String[]
         * @default         config.package.json.keywords
         *
         * Specify the keywords of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get keywords() {
            return api.config.package.json.keywords;
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
         * @default         config.package.json.author
         *
         * Specify the author of the project.
         * Must be an object with the "name", "email" and "url" properties
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get author() {
            let author = api.config.package.json.author;
            if (typeof author === 'string') {
                author = (0, package_1.__parseAuthorString)(author);
            }
            return author;
        },
        /**
         * @name            ob
         * @namespace       config.metas
         * @type            String
         * @default         config.package.author
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
                image: 'https://cdnv2.coffeekraken.io/global/coffeekraken-og.png',
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWtFO0FBRWxFLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzdCLE9BQU87S0FDVjtJQUVELE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLOztZQUNMLE9BQU8sQ0FDSCxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2hFLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksV0FBVztZQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksVUFBVTtZQUNWLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksTUFBTTtZQUNOLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxJQUFBLDZCQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsT0FBTztnQkFDSCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNyQixXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNqQyxJQUFJLEVBQUUsU0FBUztnQkFDZixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUN0QixLQUFLLEVBQUUsMERBQTBEO2FBQ3BFLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUExSUQsNEJBMElDIn0=