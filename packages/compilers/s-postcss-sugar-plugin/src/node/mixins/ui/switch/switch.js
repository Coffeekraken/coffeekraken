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
        --thumb-color-inactive: sugar.color(current);
        --thumb-color-highlight: sugar.color(current, --alpha 0.2);

        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 0.2em;
        --track-color-active: sugar.color(current);
        --track-color-inactive: sugar.color(current, --alpha 0.1);

        --isLTR: 1;

        @sugar.direction.rtl {
            --isLTR: -1;
        }

        --thumb-position: 0%;
        --thumb-transition-duration: .25s;
        
        padding: var(--track-padding);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        
        appearance: none;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        &:checked {
            &::before {
            }
            &::after {
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
        }

        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
        }

        &:not(:disabled):hover::before {
        }
        &:not(:disabled):focus::before {
        }

        &:checked {
            --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
        }

        &:indeterminate {
            --thumb-position: calc(
                calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2))
                * var(--isLTR)
            );
        }

        @sugar.state.disabled {
            --thumb-color: transparent;
            @sugar.disabled;
        }

    `);
    }
    switch (finalParams.style) {
        case 'solid':
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
        
                    font-size: sugar.scalable(0.8rem);        
                    background: var(--track-color-inactive);
                    border-radius: var(--track-size);

                    border: sugar.color(current, border) solid sugar.theme(ui.switch.borderWidth);
                    outline-offset: 5px;
                    
                    transition: sugar.theme(ui.switch.transition);

                    &:checked {
                        &::before {
                            background: var(--thumb-color-active) !important;
                        }
                        &::after {
                            box-shadow: 0 0 3px sugar.color(current, --darken 20);
                        }
                    }

                    &::before {
                        --highlight-size: 0;

                        background: var(--thumb-color-inactive);
                        box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
                        border-radius: 50%;
                        transform: translateX(var(--thumb-position));
                        box-shadow: 0;
                        transition: sugar.theme(ui.switch.transition);
                    }

                    &::after {
                        background: rgba(255,255,25,0);
                        border-radius: 50%;
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
                    }

                `);
            }
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDeEQsbURBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTztLQUNuQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQ2QsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUZiLENBQUMsQ0FBQztLQUNGO0lBRUQsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssT0FBTztZQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBaURULENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9