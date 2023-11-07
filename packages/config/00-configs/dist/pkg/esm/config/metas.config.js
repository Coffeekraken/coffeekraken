import { __parseAuthorString } from '@coffeekraken/sugar/package';
export default function (api) {
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
                author = __parseAuthorString(author);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksS0FBSzs7WUFDTCxPQUFPLENBQ0gsTUFBQSxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksMENBQUUsS0FBSyxtQ0FDL0IsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxJQUFJLDBDQUFFLElBQUksQ0FDakMsQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxRQUFROztZQUNSLE9BQU8sTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxJQUFJLDBDQUFFLFFBQVEsQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksV0FBVzs7WUFDWCxPQUFPLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsSUFBSSwwQ0FBRSxXQUFXLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7O1lBQ1IsT0FBTyxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksMENBQUUsUUFBUSxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxVQUFVO1lBQ1YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxNQUFNOztZQUNOLElBQUksTUFBTSxHQUFHLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsSUFBSSwwQ0FBRSxNQUFNLENBQUM7WUFDOUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRTtZQUNGLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFDckIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDdEIsS0FBSyxFQUFFLDBEQUEwRDthQUNwRSxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=