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
                name: 'low',
                speedIndex: 30,
            },
            2: {
                name: 'medium',
                speedIndex: 40,
            },
            3: {
                name: 'high',
                speedIndex: 50,
            },
            4: {
                name: 'extrem',
                speedIndex: 60,
            },
        },
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
                background: 1,
                'background-attachment': 1,
                'background-blend-mode': 2,
                'background-clip': 2,
                'background-color': 1,
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
                color: 1,
                'column-count': 1,
                'column-fill': 1,
                'column-gap': 1,
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
                // 'gap': 0,
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
                'list-style-image': 1,
                // 'list-style-position': 0,
                // 'list-style-type': 0,
                // 'margin': 0,
                // 'margin-bottom': 0,
                // 'margin-left': 0,
                // 'margin-right': 0,
                // 'margin-top': 0,
                // 'margin-inline': 0,
                // 'margin-inline-start': 0,
                // 'margin-inline-end': 0,
                // 'margin-block': 0,
                // 'margin-block-start': 0,
                // 'margin-block-end': 0,
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
                // 'padding': 0,
                // 'padding-bottom': 0,
                // 'padding-left': 0,
                // 'padding-right': 0,
                // 'padding-top': 0,
                // 'padding-inline': 0,
                // 'padding-inline-start': 0,
                // 'padding-inline-end': 0,
                // 'padding-block': 0,
                // 'padding-block-start': 0,
                // 'padding-block-end': 0,
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
                'text-shadow': 3,
                'text-transform': 1,
                // 'top': 0,
                // 'transform': 0,
                // 'transform-origin': 0,
                // 'transform-style': 0,
                transition: 2,
                'transition-delay': 2,
                'transition-duration': 2,
                'transition-property': 2,
                'transition-timing-function': 2,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxLQUFLO1FBRWQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxDQUFDO1FBRVgsTUFBTSxFQUFFO1lBQ0osQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxLQUFLO2dCQUNYLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRSxFQUFFO2FBQ2pCO1NBQ0o7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGFBQWEsRUFBRSxJQUFJO1FBRW5CLElBQUksYUFBYTtZQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFBRSxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPO2dCQUNILHNCQUFzQjtnQkFDdEIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLFNBQVMsRUFBRSxDQUFDO2dCQUNaLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3BCLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLDJCQUEyQixFQUFF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