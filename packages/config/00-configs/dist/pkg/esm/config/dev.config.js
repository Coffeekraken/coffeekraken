export default (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        colors: {
            /**
             * @name                yellow
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #ffdc89
             *
             * Specify the "yellow" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            yellow: '#ffdc89',
            /**
             * @name                cyan
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #65c1cd
             *
             * Specify the "cyan" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            cyan: '#65c1cd',
            /**
             * @name                green
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #a7cb8b
             *
             * Specify the "green" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            green: '#a7cb8b',
            /**
             * @name                magenta
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #d190e3
             *
             * Specify the "magenta" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            magenta: '#d190e3',
            /**
             * @name                red
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #e78287
             *
             * Specify the "red" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            red: '#e78287',
            /**
             * @name                blue
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #71bdf2
             *
             * Specify the "blue" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            blue: '#71bdf2',
            /**
             * @name                primary
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #ffdc89
             *
             * Specify the "primary" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            primary: '#ffdc89',
            /**
             * @name                secondary
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #65c1cd
             *
             * Specify the "secondary" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            secondary: '#65c1cd',
            /**
             * @name                grey
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #e2e5e9
             *
             * Specify the "grey" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            grey: '#e2e5e9',
            /**
             * @name                gray
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #e2e5e9
             *
             * Specify the "gray" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            gray: '#e2e5e9',
            /**
             * @name                black
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #343a43
             *
             * Specify the "black" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            black: '#343a43',
            /**
             * @name                white
             * @namespace           config.dev.colors
             * @type                Color
             * @default             #e2e5e9
             *
             * Specify the "white" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            white: '#e2e5e9',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLFNBQVM7WUFFakI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxTQUFTO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsU0FBUztZQUVsQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFNBQVM7WUFFZDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFFZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLFNBQVM7WUFFbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQVMsRUFBRSxTQUFTO1lBRXBCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsU0FBUztZQUVmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsU0FBUztZQUVmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsU0FBUztZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7U0FDbkI7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=