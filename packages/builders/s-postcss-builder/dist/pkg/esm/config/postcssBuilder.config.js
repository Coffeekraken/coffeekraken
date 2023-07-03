export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            input
         * @namespace       config.postcssBuilder
         * @type            String
         * @default         [config.storage.src.cssDir]/index.css
         *
         * Specify the input file to use for building your postcss
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.cssDir}/index.css`;
        },
        /**
         * @name            output
         * @namespace       config.postcssBuilder
         * @type            String
         * @default         [config.storage.dist.cssDir]/index.css
         *
         * Specify the output file to save your builded postcss
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get output() {
            return `${api.config.storage.dist.cssDir}/index.css`;
        },
        /**
         * @name            postcss
         * @namespace       config.postcssBuilder
         * @type            Object
         * @default         [config.postcss]
         *
         * Specify the postcss compiler configuration
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get postcss() {
            return api.config.postcss;
        },
        /**
         * @name            purgecss
         * @namespace       config.postcssBuilder
         * @type            Object
         * @default         [config.purgecss]
         *
         * Specify the purgecss compiler configuration
         *
         * @since       2.0.0
         * @author         Oli vier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get purgecss() {
            return api.config.purgecss;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFlBQVksQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLENBQUM7UUFDekQsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxRQUFRO1lBQ1IsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==