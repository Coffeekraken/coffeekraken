import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          inputContainer
 * @as          @s.ui.inputContainer
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply an input container style like "button", "addon", etc...
 *
 * @param       {'addon'|'group'}                           lnf         The style you want to apply
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.inputContainer
 *
 * @example     css
 * .my-input-container {
 *    @s.ui.inputContainer(group);
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['addon', 'group'],
                required: true,
            },
        };
    }
}

export interface ISSugarcssPluginUiFormInputParams {
    lnf: 'addon' | 'group';
}

export { SSugarcssPluginUiFormInputInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiFormInputParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiFormInputParams = {
        lnf: 'group',
        ...params,
    };

    const vars: string[] = [];
    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);

    vars.push(`@s.scope 'bare' {`);
    switch (finalParams.lnf) {
        case 'addon':
            vars.push(`
                display: block;
                position: relative;

                & > *:first-child {
                    width: 100%;
                    padding-inline-end: 3em;
                }
                & > *:first-child + * {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    height: 100%;
                    aspect-ratio: 1;
                    top: 0; right: 0;
                }

                [dir="rtl"] &, &[dir="rtl"] {
                    & > *:first-child + * {
                        right: auto;
                        left: 0;
                    }
                }
                `);
            break;
        case 'group':
        default:
            vars.push(`
                display: flex;

                &:not([dir="rtl"] &):not([dir="rtl"]) {
                    & > *:first-child,
                    & > .s-input-container > *:first-child {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    & > *:last-child,
                    & > .s-input-container > *:last-child {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                }
                [dir="rtl"] &, &[dir="rtl"] {
                    & > *:first-child,
                    & > .s-input-container > *:first-child {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                    & > *:last-child,
                    & > .s-input-container > *:last-child {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }

                & > *:not(:first-child, :last-child),
                & > .s-input-container > *:not(:first-child, :last-child) {
                    border-radius: 0;
                }
            `);
            break;
    }

    vars.push('}');

    return vars;
}
