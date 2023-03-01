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
                name: 'bare+',
                speedIndex: 30,
            },
            2: {
                name: 'low',
                speedIndex: 40,
            },
            3: {
                name: 'medium',
                speedIndex: 50,
            },
            4: {
                name: 'high',
                speedIndex: 60,
            },
        },
        /**
         * @name              method
         * @namespace         config.themeLod
         * @type              String
         * @values            class,file
         * @default           file
         *
         * Specify the method to generate the lod (level of details).
         * The "class" one let all the css in the same output file and scope each lod things (properties, rules, etc...) into
         * a "s-lod--%level" class.
         * The "file" one exports all the lod things into an external file that will be called "${source.input.filename}.lod-%level.css"
         * You can override this method for each of your `@sugar.lod...` mixin calls.
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        method: 'file',
        /**
         * @name              defaultAction
         * @namespace         config.themeLod
         * @type              String
         * @values            >,<,=,>=,<=
         * @default           >=
         *
         * Specify the default action to apply if you don't specify one in your lod
         * mixin call like ```@sugar.lod(2) {...}```. If the defaultAction is set to ">=",
         * the above lod query will be the same as ```@sugar.lod('>=2') {...}```
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
                animation: 3,
                'animation-delay': 3,
                'animation-direction': 3,
                'animation-duration': 3,
                'animation-fill-mode': 3,
                'animation-iteration-count': 3,
                'animation-name': 3,
                'animation-play-state': 3,
                'animation-timing-function': 3,
                // 'appearance': 0,
                // 'aspect-ratio': 0,
                // 'backface-visibility': 0,
                'backdrop-filter': 3,
                background: 2,
                'background-attachment': 2,
                'background-blend-mode': 3,
                'background-clip': 2,
                'background-color': 2,
                'background-image': 2,
                'background-origin': 2,
                'background-position': 2,
                'background-repeat': 2,
                'background-size': 2,
                border: 2,
                'border-bottom': 2,
                'border-bottom-color': 2,
                'border-bottom-left-radius': 2,
                'border-bottom-right-radius': 2,
                'border-bottom-style': 2,
                'border-bottom-width': 2,
                'border-collapse': 2,
                'border-color': 2,
                'border-image': 2,
                'border-image-outset': 2,
                'border-image-repeat': 2,
                'border-image-slice': 2,
                'border-image-source': 2,
                'border-image-width': 2,
                'border-left': 2,
                'border-left-color': 2,
                'border-left-style': 2,
                'border-left-width': 2,
                'border-radius': 2,
                'border-right': 2,
                'border-right-color': 2,
                'border-right-style': 2,
                'border-right-width': 2,
                'border-spacing': 2,
                'border-style': 2,
                'border-top': 2,
                'border-top-color': 2,
                'border-top-left-radius': 2,
                'border-top-right-radius': 2,
                'border-top-style': 2,
                'border-top-width': 2,
                'border-width': 2,
                // 'bottom': 0,
                // 'box-decoration-break': 0,
                'box-shadow': 3,
                // 'box-sizing': 0,
                // 'caption-side': 0,
                'caret-color': 1,
                // 'clear': 0,
                // 'clip': 0,
                // 'clip-path': 0,
                color: 2,
                'column-count': 2,
                'column-fill': 2,
                'column-gap': 1,
                'column-rule': 2,
                'column-rule-color': 2,
                'column-rule-style': 2,
                'column-rule-width': 2,
                // 'column-span': 0,
                // 'column-width': 0,
                // 'columns': 0,
                // 'content': 0,
                'counter-increment': 2,
                'counter-reset': 2,
                // 'cursor': 0,
                // 'direction': 0,
                // 'display': 0,
                // 'empty-cells': 0,
                filter: 3,
                // 'flex': 0,
                // 'flex-basis': 0,
                // 'flex-direction': 0,
                // 'flex-flow': 0,
                // 'flex-grow': 0,
                // 'flex-shrink': 0,
                // 'flex-wrap': 0,
                // 'float': 0,
                font: 1,
                'font-family': 1,
                'font-kerning': 1,
                'font-size': 1,
                'font-stretch': 1,
                'font-style': 1,
                'font-variant': 1,
                'font-weight': 1,
                gap: 1,
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
                'letter-spacing': 1,
                'line-height': 1,
                // 'list-style': 0,
                'list-style-image': 2,
                // 'list-style-position': 0,
                // 'list-style-type': 0,
                margin: 1,
                'margin-bottom': 1,
                'margin-left': 1,
                'margin-right': 1,
                'margin-top': 1,
                'margin-inline': 1,
                'margin-inline-start': 1,
                'margin-inline-end': 1,
                'margin-block': 1,
                'margin-block-start': 1,
                'margin-block-end': 1,
                // 'max-height': 0,
                // 'max-width': 0,
                // 'min-height': 0,
                // 'min-width': 0,
                // 'object-fit': 0,
                // 'object-position': 0,
                // 'opacity': 0,
                // 'order': 0,
                outline: 2,
                'outline-color': 2,
                'outline-offset': 2,
                'outline-style': 2,
                'outline-width': 2,
                // 'overflow': 0,
                // 'overflow-x': 0,
                // 'overflow-y': 0,
                padding: 1,
                'padding-bottom': 1,
                'padding-left': 1,
                'padding-right': 1,
                'padding-top': 1,
                'padding-inline': 1,
                'padding-inline-start': 1,
                'padding-inline-end': 1,
                'padding-block': 1,
                'padding-block-start': 1,
                'padding-block-end': 1,
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
                'text-decoration': 2,
                'text-decoration-color': 2,
                'text-decoration-line': 2,
                'text-indent': 2,
                'text-justify': 2,
                'text-overflow': 2,
                'text-shadow': 3,
                'text-transform': 2,
                // 'top': 0,
                // 'transform': 0,
                // 'transform-origin': 0,
                // 'transform-style': 0,
                transition: 3,
                'transition-delay': 3,
                'transition-duration': 3,
                'transition-property': 3,
                'transition-timing-function': 3,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxLQUFLO1FBRWQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDO1FBRVgsTUFBTSxFQUFFO1lBQ0osQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxLQUFLO2dCQUNYLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1NBQ0o7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUVkOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsYUFBYSxFQUFFLElBQUk7UUFFbkIsSUFBSSxhQUFhO1lBQ2IsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU87Z0JBQ0gsc0JBQXNCO2dCQUN0QixvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEIscUJBQXFCLEVBQUUsQ0FBQztnQkFDeEIsb0JBQW9CLEVBQUUsQ0FB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