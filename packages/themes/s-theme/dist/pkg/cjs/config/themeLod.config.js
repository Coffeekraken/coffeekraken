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
         * @name              defaultMethod
         * @namespace         config.themeLod
         * @type              String
         * @values            class,file
         * @default           file
         *
         * Specify the default method to generate the lod (level of details).
         * The "class" one let all the css in the same output file and scope each lod things (properties, rules, etc...) into
         * a "s-lod--%level" class.
         * The "file" one exports all the lod things into an external file that will be called "${source.input.filename}.lod-%level.css"
         * You can override this method for each of your `@sugar.lod...` mixin calls.
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultMethod: 'file',
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsQ0FBQztRQUVYLE1BQU0sRUFBRTtZQUNKLENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixVQUFVLEVBQUUsQ0FBQzthQUNoQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixVQUFVLEVBQUUsRUFBRTthQUNqQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsRUFBRTthQUNqQjtTQUNKO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsYUFBYSxFQUFFLE1BQU07UUFFckI7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUVuQixJQUFJLGFBQWE7WUFDYixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDM0MsT0FBTztnQkFDSCxzQkFBc0I7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixTQUFTLEVBQUUsQ0FBQztnQkFDWixpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQixxQkFBcUIsRUFBRSxDQUFDO2dCQUN4QixvQkFBb0IsRUFBRSxDQUFDO2dCQUN2Qixx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