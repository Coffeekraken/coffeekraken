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
         * @default         config.package.json.title ?? config.package.json.name
         *
         * Specify the title of the project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get title() {
            return (
                api.config.package.json.title ?? api.config.package.json.name
            );
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
