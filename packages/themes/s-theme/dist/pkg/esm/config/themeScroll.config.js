export default function (api) {
    return {
        /**
         * @name                duration
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
         *
         * Specify the scroll duration for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        duration: 300,
        /**
         * @name                offset
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
         *
         * Specify the scroll offset for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offset: 0,
        /**
         * @name                offsetX
         * @namespace           config.themeScroll
         * @type                String
         * @default             [theme.layout.offset.left]
         *
         * Specify the scroll offset x for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get offsetX() {
            return api.theme.layout.offset.left;
        },
        /**
         * @name                offsetY
         * @namespace           config.themeScroll
         * @type                String
         * @default             [theme.layout.offset.top]
         *
         * Specify the scroll offset y for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get offsetY() {
            return api.theme.layout.offset.top;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxHQUFHO1FBRWI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxDQUFDO1FBRVQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==