(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            style
             * @namespace       config.shieldsio
             * @type            String
             * @values           plastic,flat,for-the-badge,social
             * @default         for-the-badge
             *
             * Specify the shieldsio style you want for your badges
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            style: 'for-the-badge',
            shields: {
                size: {
                    /**
                     * @name            url
                     * @namespace       config.shieldsio.shields.size
                     * @type            String
                     * @default         https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]
                     *
                     * Specify the shieldsio url for the "size" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    url: 'https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]',
                    /**
                     * @name            href
                     * @namespace       config.shieldsio.shields.href
                     * @type            String
                     * @default         https://www.npmjs.com/package/[packageJson.name]
                     *
                     * Specify the shieldsio href for the "size" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    href: 'https://www.npmjs.com/package/[packageJson.name]',
                },
                downloads: {
                    /**
                     * @name            url
                     * @namespace       config.shieldsio.shields.download
                     * @type            String
                     * @default         https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]
                     *
                     * Specify the shieldsio url for the "download" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    url: 'https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]',
                    /**
                     * @name            href
                     * @namespace       config.shieldsio.shields.download
                     * @type            String
                     * @default         https://www.npmjs.com/package/[packageJson.name]
                     *
                     * Specify the shieldsio href for the "download" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    href: 'https://www.npmjs.com/package/[packageJson.name]',
                },
                license: {
                    /**
                     * @name            url
                     * @namespace       config.shieldsio.shields.license
                     * @type            String
                     * @default         https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]
                     *
                     * Specify the shieldsio url for the "license" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    url: 'https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]',
                    /**
                     * @name            href
                     * @namespace       config.shieldsio.shields.license
                     * @type            String
                     * @default         ./LICENSE
                     *
                     * Specify the shieldsio href for the "license" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    href: './LICENSE',
                },
                discord: {
                    /**
                     * @name            url
                     * @namespace       config.shieldsio.shields.discord
                     * @type            String
                     * @default         https://shields.io/discord/[config.discord.server.id]?style=[config.shieldsio.style]
                     *
                     * Specify the shieldsio url for the "discord" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    url: 'https://shields.io/discord/[config.discord.server.id]?style=[config.shieldsio.style]',
                    /**
                     * @name            href
                     * @namespace       config.shieldsio.shields.license
                     * @type            String
                     * @default         [config.discord.server.url]
                     *
                     * Specify the shieldsio href for the "discord" shield
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    href: '[config.discord.server.url]',
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZWxkc2lvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaWVsZHNpby5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxlQUFlO1lBQ3RCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsR0FBRyxFQUFFLHVGQUF1RjtvQkFDNUY7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsSUFBSSxFQUFFLGtEQUFrRDtpQkFDM0Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEdBQUcsRUFBRSw2RUFBNkU7b0JBQ2xGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSxrREFBa0Q7aUJBQzNEO2dCQUNELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxHQUFHLEVBQUUsNEVBQTRFO29CQUNqRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsV0FBVztpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEdBQUcsRUFBRSxzRkFBc0Y7b0JBQzNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSw2QkFBNkI7aUJBQ3RDO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztJQTVIRCw0QkE0SEMifQ==