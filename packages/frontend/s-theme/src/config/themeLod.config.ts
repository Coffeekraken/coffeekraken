/**
 * @name                    themeLod
 * @as                      Lod (level of details)
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  wip
 *
 * Specify the @coffeekraken/s-theme lof (level of details) available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name                enabled
         * @namespace           config.themeLod
         * @type                Boolean
         * @default             false
         *
         * Specify if your project make uses of the lod (level of details) feature or not
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        enabled: false,

        /**
         * @name                defaultLevel
         * @namespace           config.themeLod
         * @type                Boolean
         * @default             false
         *
         * Specify the default lod level to use
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultLevel: 3,

        /**
         * @name                botLevel
         * @namespace           config.themeLod
         * @type                Boolean
         * @default             false
         *
         * Specify the lod level to use when the request come from a bot (google, amazon, etc...)
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        botLevel: 1,

        levels: {
            0: {
                name: 'bare',
                speedIndex: 0,
            },
            1: {
                name: 'lnf',
                speedIndex: 30,
            },
            2: {
                name: 'theme',
                speedIndex: 40,
            },
            3: {
                name: 'high',
                speedIndex: 50,
            },
            4: {
                name: 'ultra',
                speedIndex: 60,
            },
        },

        /**
         * @name              method
         * @namespace         config.themeLod
         * @type              String
         * @values            class,file
         * @default           class
         *
         * Specify the method to generate the lod (level of details).
         * The "class" one let all the css in the same output file and scope each lod things (properties, rules, etc...) into
         * a "s-lod-%level" class.
         * The "file" one exports all the lod things into an external file that will be called "${source.input.filename}.lod-%level.css"
         * You can override this method for each of your `@s.lod...` mixin calls.
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        method: 'class',

        /**
         * @name              defaultAction
         * @namespace         config.themeLod
         * @type              String
         * @values            >,<,=,>=,<=
         * @default           >=
         *
         * Specify the default action to apply if you don't specify one in your lod
         * mixin call like ```@s.lod(2) {...}```. If the defaultAction is set to ">=",
         * the above lod query will be the same as ```@s.lod('>=2') {...}```
         * Note that by default it is set to ">="
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultAction: '>=',

        get cssProperties() {
            if (api.env.platform !== 'node') return {};
            return {
                // 'align-content': 0,
                // 'align-items': 0,
                // 'align-self': 0,
                animation: 2,
                'animation-delay': 2,
                'animation-direction': 2,
                'animation-duration': 2,
                'animation-fill-mode': 2,
                'animation-iteration-count': 2,
                'animation-name': 2,
                'animation-play-state': 2,
                'animation-timing-function': 2,
                // 'appearance': 0,
                // 'aspect-ratio': 0,
                // 'backface-visibility': 0,
                'backdrop-filter': 3,
                background: 1,
                'background-attachment': 1,
                'background-blend-mode': 3,
                'background-clip': 1,
                'background-color': 1,
                'background-image': 1,
                'background-origin': 1,
                'background-position': 1,
                'background-repeat': 1,
                'background-size': 1,
                border: 1,
                'border-bottom': 1,
                'border-bottom-color': 1,
                'border-bottom-left-radius': 1,
                'border-bottom-right-radius': 1,
                'border-bottom-style': 1,
                'border-bottom-width': 1,
                'border-collapse': 1,
                'border-color': 1,
                'border-image': 1,
                'border-image-outset': 1,
                'border-image-repeat': 1,
                'border-image-slice': 1,
                'border-image-source': 1,
                'border-image-width': 1,
                'border-left': 1,
                'border-left-color': 1,
                'border-left-style': 1,
                'border-left-width': 1,
                'border-radius': 1,
                'border-right': 1,
                'border-right-color': 1,
                'border-right-style': 1,
                'border-right-width': 1,
                'border-spacing': 1,
                'border-style': 1,
                'border-top': 1,
                'border-top-color': 1,
                'border-top-left-radius': 1,
                'border-top-right-radius': 1,
                'border-top-style': 1,
                'border-top-width': 1,
                'border-width': 1,
                // 'bottom': 0,
                // 'box-decoration-break': 0,
                'box-shadow': 1,
                // 'box-sizing': 0,
                // 'caption-side': 0,
                'caret-color': 1,
                // 'clear': 0,
                // 'clip': 0,
                // 'clip-path': 0,
                color: 1,
                'column-count': 1,
                'column-fill': 1,
                // 'column-gap': 1,
                'column-rule': 1,
                'column-rule-color': 1,
                'column-rule-style': 1,
                'column-rule-width': 1,
                // 'column-span': 0,
                // 'column-width': 0,
                // 'columns': 0,
                // 'content': 0,
                'counter-increment': 1,
                'counter-reset': 1,
                // 'cursor': 0,
                // 'direction': 0,
                // 'display': 0,
                // 'empty-cells': 0,
                filter: 1,
                // 'flex': 0,
                // 'flex-basis': 0,
                // 'flex-direction': 0,
                // 'flex-flow': 0,
                // 'flex-grow': 0,
                // 'flex-shrink': 0,
                // 'flex-wrap': 0,
                // 'float': 0,
                // font: 1,
                // 'font-family': 1,
                // 'font-kerning': 1,
                // 'font-size': 1,
                // 'font-stretch': 1,
                // 'font-style': 1,
                // 'font-variant': 1,
                // 'font-weight': 1,
                // gap: 1,
                // 'grid': 0,
                // 'grid-area': 0,
                // 'grid-auto-columns': 0,
                // 'grid-auto-flow': 0,
                // 'grid-auto-rows': 0,
                // 'grid-column': 0,
                // 'grid-column-end': 0,
                // 'grid-column-gap': 0,
                // 'grid-column-start': 0,
                // 'grid-gap': 0,
                // 'grid-row': 0,
                // 'grid-row-end': 0,
                // 'grid-row-gap': 0,
                // 'grid-row-start': 0,
                // 'grid-template': 0,
                // 'grid-template-areas': 0,
                // 'grid-template-columns': 0,
                // 'grid-template-rows': 0,
                // 'height': 0,
                // 'hyphens': 0,
                // 'justify-content': 0,
                // 'left': 0,
                // 'letter-spacing': 1,
                // 'line-height': 1,
                // 'list-style': 0,
                'list-style-image': 1,
                // 'list-style-position': 0,
                // 'list-style-type': 0,
                // margin: 1,
                // 'margin-bottom': 1,
                // 'margin-left': 1,
                // 'margin-right': 1,
                // 'margin-top': 1,
                // 'margin-inline': 1,
                // 'margin-inline-start': 1,
                // 'margin-inline-end': 1,
                // 'margin-block': 1,
                // 'margin-block-start': 1,
                // 'margin-block-end': 1,
                // 'max-height': 0,
                // 'max-width': 0,
                // 'min-height': 0,
                // 'min-width': 0,
                // 'object-fit': 0,
                // 'object-position': 0,
                // 'opacity': 0,
                // 'order': 0,
                outline: 1,
                'outline-color': 1,
                'outline-offset': 1,
                'outline-style': 1,
                'outline-width': 1,
                // 'overflow': 0,
                // 'overflow-x': 0,
                // 'overflow-y': 0,
                // padding: 1,
                // 'padding-bottom': 1,
                // 'padding-left': 1,
                // 'padding-right': 1,
                // 'padding-top': 1,
                // 'padding-inline': 1,
                // 'padding-inline-start': 1,
                // 'padding-inline-end': 1,
                // 'padding-block': 1,
                // 'padding-block-start': 1,
                // 'padding-block-end': 1,
                // 'page-break-after': 0,
                // 'page-break-before': 0,
                // 'page-break-inside': 0,
                // 'perspective': 0,
                // 'perspective-origin': 0,
                // 'pointer-events': 0,
                // 'position': 0,
                // 'quotes': 0,
                // 'right': 0,
                // 'rotate': 0,
                // 'row-gap': 0,
                // 'scale': 0,
                // 'scroll-behavior': 0,
                // 'table-layout': 0,
                // 'text-align': 0,
                // 'text-align-last': 0,
                'text-decoration': 1,
                'text-decoration-color': 1,
                'text-decoration-line': 1,
                'text-indent': 1,
                'text-justify': 1,
                'text-overflow': 1,
                'text-shadow': 2,
                'text-transform': 1,
                // 'top': 0,
                // 'transform': 0,
                // 'transform-origin': 0,
                // 'transform-style': 0,
                transition: 1,
                'transition-delay': 1,
                'transition-duration': 1,
                'transition-property': 1,
                'transition-timing-function': 1,
                // 'translate': 0,
                // 'user-select': 0,
                // 'vertical-align': 0,
                // 'visibility': 0,
                // 'white-space': 0,
                // 'width': 0,
                'word-break': 1,
                'word-spacing': 1,
                'word-wrap': 1,
                // 'wrinting-mode': 0,
                // 'z-index': 0,
            };
        },
    };
}
