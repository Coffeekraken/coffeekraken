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
         * @default         config.package?.json?.title ?? config.package?.json?.name
         *
         * Specify the title of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get title() {
            var _a, _b, _c, _d, _e;
            return ((_c = (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : (_e = (_d = api.config.package) === null || _d === void 0 ? void 0 : _d.json) === null || _e === void 0 ? void 0 : _e.name);
        },
        /**
         * @name            homepage
         * @namespace       config.metas
         * @type            String
         * @default         config.package?.json?.homepage
         *
         * Specify the homepage url of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get homepage() {
            var _a, _b;
            return (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.homepage;
        },
        /**
         * @name            description
         * @namespace       config.metas
         * @type            String
         * @default         config.package?.json?.description
         *
         * Specify the description of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get description() {
            var _a, _b;
            return (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.description;
        },
        /**
         * @name            keywords
         * @namespace       config.metas
         * @type            String[]
         * @default         config.package?.json?.keywords
         *
         * Specify the keywords of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get keywords() {
            var _a, _b;
            return (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.keywords;
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
         * @default         config.package?.json?.author
         *
         * Specify the author of the project.
         * Must be an object with the "name", "email" and "url" properties
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get author() {
            var _a, _b;
            let author = (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.author;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWtFO0FBRWxFLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzdCLE9BQU87S0FDVjtJQUVELE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLOztZQUNMLE9BQU8sQ0FDSCxNQUFBLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsSUFBSSwwQ0FBRSxLQUFLLG1DQUMvQixNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksMENBQUUsSUFBSSxDQUNqQyxDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7O1lBQ1IsT0FBTyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksMENBQUUsUUFBUSxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxXQUFXOztZQUNYLE9BQU8sTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxJQUFJLDBDQUFFLFdBQVcsQ0FBQztRQUNqRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTs7WUFDUixPQUFPLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsSUFBSSwwQ0FBRSxRQUFRLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFVBQVU7WUFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLE1BQU07O1lBQ04sSUFBSSxNQUFNLEdBQUcsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxJQUFJLDBDQUFFLE1BQU0sQ0FBQztZQUM5QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsTUFBTSxHQUFHLElBQUEsNkJBQW1CLEVBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUU7WUFDRixPQUFPO2dCQUNILEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3JCLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBRSxTQUFTO2dCQUNmLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RCLEtBQUssRUFBRSwwREFBMEQ7YUFDcEUsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTNJRCw0QkEySUMifQ==