import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
    static definition = {
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
            values: ['bare', 'lnf', 'tf', 'vr'],
            default: ['bare', 'lnf', 'tf', 'vr'],
        },
    };
}

export interface IPostcssSugarPluginUiSwitchMixinParams {
    style: string;
    scope: string[];
}

export { postcssSugarPluginUiSwitchMixinInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiSwitchMixinParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiSwitchMixinParams = {
        style: 'solid',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

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

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`
            @sugar.rhythm.vertical {
                ${jsObjectToCssProperties(__theme().config('ui.switch.:rhythmVertical'))}
            } 
        `);
    }

    replaceWith(vars);
}
