import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchMixinInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: 'solid',
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiSwitchMixinInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        
        font-size: sugar.scalable(0.8rem);

        --thumb-size: 1em;
        --thumb-color-active: sugar.color(main, surface);
        --thumb-color-inactive: sugar.color(ui);
        --thumb-color-highlight: sugar.color(ui, --alpha 0.2);

        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 0.2em;
        --track-color-active: sugar.color(ui);
        --track-color-inactive: sugar.color(ui, --alpha 0.1);

        --isLTR: 1;

        &:dir(rtl) {
            --isLTR: -1;
        }

        --thumb-position: 0%;
        --thumb-transition-duration: .25s;
        
        padding: var(--track-padding);
        background: var(--track-color-inactive);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        border-radius: var(--track-size);

        appearance: none;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        border: sugar.color(ui, border) solid sugar.theme(ui.switch.borderWidth);
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        transition: sugar.theme(ui.switch.transition);

        &:checked {
            &::before {
                background: var(--thumb-color-active) !important;
            }
            &::after {
                box-shadow: 0 0 3px sugar.color(ui, --darken 20);
            }
        }

        &::before {
            --highlight-size: 0;

            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
            background: var(--thumb-color-inactive);
            box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
            border-radius: 50%;
            transform: translateX(var(--thumb-position));
            box-shadow: 0;
            transition: sugar.theme(ui.switch.transition);
        }

        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
            background: rgba(255,255,25,0);
            border-radius: 50%;
            transform: translateX(var(--thumb-position));
            box-shadow: 0;
            transition: sugar.theme(ui.switch.transition);
        }

        &:not(:disabled):hover::before {
            --highlight-size: .5rem;
        }
        &:not(:disabled):focus::before {
            --highlight-size: .25rem;
        }

        &:checked {
            background: var(--track-color-active);
            --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
        }

        &:indeterminate {
            --thumb-position: calc(
                calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2))
                * var(--isLTR)
            );
        }

        &:disabled {
            --thumb-color: transparent;
            @sugar.disabled;
        }

    `);
    }
    // if (finalParams.scope.indexOf('lnf') !== -1 && finalParams.scope.indexOf('style') !== -1) {
    //     switch (finalParams.style) {
    //         case 'gradient':
    //             break;
    //         case 'outline':
    //             break;
    //         case 'default':
    //         default:
    //             vars.push(`
    //         `);
    //             break;
    //     }
    // }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDeEQsbURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTztLQUNuQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQ2QsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNEdiLENBQUMsQ0FBQztLQUNGO0lBRUQsOEZBQThGO0lBQzlGLG1DQUFtQztJQUNuQywyQkFBMkI7SUFDM0IscUJBQXFCO0lBQ3JCLDBCQUEwQjtJQUMxQixxQkFBcUI7SUFDckIsMEJBQTBCO0lBQzFCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFFMUIsY0FBYztJQUVkLHFCQUFxQjtJQUNyQixRQUFRO0lBQ1IsSUFBSTtJQUVKLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=