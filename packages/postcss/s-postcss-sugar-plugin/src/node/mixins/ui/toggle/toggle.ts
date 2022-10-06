import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          toggle
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./toggle
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate some "toggle" UI components like a burger, etc...
 * A toggle is a 1 tag element that reacts to his "state" like the "focus" and "active".
 *
 * @param       {'burger'}                          type            The toggle type you want
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.toggle(burger);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiBadgeInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                values: ['burger'],
                required: true,
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeParams {
    type: 'burger';
}

export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeParams = {
        type: 'burger',
        ...params,
    };

    const vars: string[] = [];

    switch (finalParams.type) {
        case 'burger':
            vars.push(`
                position: relative;
                top: 0.5em;
                width: 1em;
                height: 0.1em;
                background-color: currentColor;
                transition: all 0.3s ease-in-out;
                transform: translateY(-0.5em);
                @sugar.border.radius;

                &:before,
                &:after {
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-color: currentColor;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    transition: all 0.3s ease-in-out;
                    opacity: 1;
                    @sugar.border.radius;
                }
                &:before {
                    transform-origin: 0 0;
                    top: -0.3em;
                }
                &:after {
                    transform-origin: 100% 100%;
                    top: 0.3em;
                }
                
                &:active,
                &:focus,
                &:focus-within,
                input:checked + &,
                input:checked + .s-menu + & {                
                    transform: translateY(-0.5em) rotate(45deg);
            
                    &:before {
                        transform: translateX(5%) translateY(-0.1em) rotate(90deg);
                    }
                    &:after {
                        transform: translateX(-50%) rotate(80deg);
                        opacity: 0;
                    }
                }
            `);
            break;
    }

    return vars;
}
