import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchMixinInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outline'],
        default: 'default'
    },
    scope: {
        type: 'String',
        values: ['bare', 'lnf', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiSwitchMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: 'default', scope: [] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        
        --thumb-size: 1em;
        --thumb: sugar.color(main, surface);
        --thumb-highlight: sugar.color(ui, --alpha 0.3);
        
        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 0.2em;
        --track-inactive: sugar.color(ui, --alpha 0.3);
        --track-active: sugar.color(ui);

        --thumb-color: var(--thumb);
        --thumb-color-highlight: var(--thumb-highlight);
        --track-color-inactive: var(--track-inactive);
        --track-color-active: var(--track-active);

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
        pointer-events: none;
        touch-action: pan-y;
        border: none;
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        transition: background-color .25s ease;

        &::before {
            --highlight-size: 0;

            content: "";
            cursor: pointer;
            pointer-events: auto;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
            background: var(--thumb-color);
            box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
            border-radius: 50%;
            transform: translateX(var(--thumb-position));

            @media (--motionOK) { & {
                transition: 
                transform var(--thumb-transition-duration) ease,
                box-shadow .25s ease;
            }}
        }

        &:not(:disabled):hover::before {
            --highlight-size: .5rem;
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
            cursor: not-allowed;
            --thumb-color: transparent;

            &::before {
                cursor: not-allowed;
                box-shadow: inset 0 0 0 2px hsl(0 0% 100% / 50%);

                @media (prefers-color-scheme: dark) { & {
                    box-shadow: inset 0 0 0 2px hsl(0 0% 0% / 50%);
                }}
            }
        }

    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1 && finalParams.scope.indexOf('style') !== -1) {
        switch (finalParams.style) {
            case 'gradient':
                break;
            case 'outline':
                break;
            case 'default':
            default:
                vars.push(`

            `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDMUQsbURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsU0FBUyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztLQUNsQztDQUNKLENBQUM7QUFRSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsRUFBRSxJQUNSLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWdHVCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFFeEYsUUFBTyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3RCLEtBQUssVUFBVTtnQkFFZixNQUFNO1lBQ04sS0FBSyxTQUFTO2dCQUVkLE1BQU07WUFDTixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7O2FBRVQsQ0FBQyxDQUFBO2dCQUVOLE1BQU07U0FDVDtLQUVGO0lBSUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==