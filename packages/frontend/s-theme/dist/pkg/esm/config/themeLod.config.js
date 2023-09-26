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
            if (api.env.platform !== 'node')
                return {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxLQUFLO1FBRWQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDO1FBRVgsTUFBTSxFQUFFO1lBQ0osQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxLQUFLO2dCQUNYLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1NBQ0o7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDSCxNQUFNLEVBQUUsT0FBTztRQUVmOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsYUFBYSxFQUFFLElBQUk7UUFFbkIsSUFBSSxhQUFhO1lBQ2IsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU87Z0JBQ0gsc0JBQXNCO2dCQUN0QixvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEIscUJBQXFCLEVBQUUsQ0FBQztn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