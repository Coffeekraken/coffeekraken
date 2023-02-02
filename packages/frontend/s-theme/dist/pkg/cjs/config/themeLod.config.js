"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
                'column-gap': 2,
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsQ0FBQztRQUVYLE1BQU0sRUFBRTtZQUNKLENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixVQUFVLEVBQUUsQ0FBQzthQUNoQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsT0FBTztnQkFDYixVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixVQUFVLEVBQUUsRUFBRTthQUNqQjtTQUNKO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsTUFBTSxFQUFFLE1BQU07UUFFZDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGFBQWEsRUFBRSxJQUFJO1FBRW5CLElBQUksYUFBYTtZQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFBRSxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPO2dCQUNILHNCQUFzQjtnQkFDdEIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLFNBQVMsRUFBRSxDQUFDO2dCQUNaLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3BCLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLHFC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