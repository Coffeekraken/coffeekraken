export default function (env) {
    if (env.platform !== 'node')
        return;
    return {
        colors: {
            /**
             * @name                primary
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #343a43
             *
             * Specify the "primary" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            primary: '[config.terminal.colors.yellow]',
            /**
             * @name                secondary
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #343a43
             *
             * Specify the "secondary" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            secondary: '[config.terminal.colors.cyan]',
            /**
             * @name                black
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #343a43
             *
             * Specify the "black" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            black: '#343a43',
            /**
             * @name                white
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #e2e5e9
             *
             * Specify the "white" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            white: '#e2e5e9',
            /**
             * @name                red
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #e78287
             *
             * Specify the "red" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            red: '#e78287',
            /**
             * @name                green
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #a7cb8b
             *
             * Specify the "green" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            green: '#a7cb8b',
            /**
             * @name                yellow
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #ffdc89
             *
             * Specify the "yellow" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            yellow: '#ffdc89',
            /**
             * @name                blue
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #71bdf2
             *
             * Specify the "blue" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            blue: '#71bdf2',
            /**
             * @name                magenta
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #d190e3
             *
             * Specify the "magenta" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            magenta: '#d190e3',
            /**
             * @name                cyan
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #65c1cd
             *
             * Specify the "cyan" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            cyan: '#65c1cd',
            /**
             * @name                grey
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             #e2e5e9
             *
             * Specify the "grey" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            grey: '#e2e5e9',
            /**
             * @name                gray
             * @namespace           config.terminal.colors
             * @type                Color
             * @default             [config.terminal.colors.grey]
             *
             * Specify the "gray" terminal color value
             *
             * @since               2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            gray: '[config.terminal.colors.grey]',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVybWluYWwuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsaUNBQWlDO1lBRTFDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsK0JBQStCO1lBRTFDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsU0FBUztZQUVoQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7WUFFaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxTQUFTO1lBRWQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsU0FBUztZQUVqQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFFZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLFNBQVM7WUFFbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxTQUFTO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxTQUFTO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSwrQkFBK0I7U0FDeEM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9