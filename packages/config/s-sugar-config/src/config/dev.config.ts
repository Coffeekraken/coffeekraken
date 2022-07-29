export default ({ env, config }) => {
    if (env.platform !== 'node') return;

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
