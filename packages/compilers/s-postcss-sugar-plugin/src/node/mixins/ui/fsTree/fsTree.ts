import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          fsTree
 * @namespace     ui.fsTree
 * @type          CssMixin
 * @interface     ./fsTree          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the fsTree style to any element
 *
 * @param       {'solid'}           [style='theme.ui.fsTree.defaultStyle']        The style you want for your fsTree
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.fsTree.defaultShape]      The shape you want for your fsTree
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-fsTree {
 *    @sugar.ui.fsTree;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUiFsTreeInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.fsTree.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.fsTree.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFsTreeParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    scope: string[];
}

export { postcssSugarPluginUiFsTreeInterface as interface };

export default function ({
    params,
    atRule,
    atRootStart,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFsTreeParams>;
    atRule: any;
    atRootStart: Function;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFsTreeParams = {
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    atRootStart(`
         :root {
            --s-fs-tree-inline-space-ratio: 1;
        }
    `);

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
            user-select: none;

            ul, ol {
                margin-inline-start: calc(1em * var(--s-fs-tree-inline-space-ratio, 1));

                li {
                    margin-inline-start: cale(1em * var(--s-fs-tree-inline-space-ratio, 1));
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    > a {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    &:before {
                        content: '';
                        font-weight:bold;
                        position: absolute;
                        z-index: -1;
                        top: 0;
                        left: calc(0.15em * var(--s-fs-tree-inline-space-ratio, 1));
                        width: 1px; height: 100%;
                        background-color: sugar.color(current, border);
                    }


                }

            }

            li {
                position: relative;

                & > *:not(ul):not(ol):not(i) {
                    padding-inline: sugar.theme(ui.fsTree.paddingInline);
                    padding-block: sugar.theme(ui.fsTree.paddingBlock);
                    padding-inline-start: calc((sugar.theme(ui.fsTree.paddingInline) + 1em) * var(--s-fs-tree-inline-space-ratio, 1));
                    display: block;
                    border-radius: sugar.theme(ui.fsTree.borderRadius);
                    text-overflow: ellipsis;

                    &:not(.s-disabled &) {
                        cursor: pointer;
                    }
                }

                & > i {
                    position: absolute;
                    top: sugar.theme(ui.fsTree.paddingBlock, true);
                    left: calc(1em * var(--s-fs-tree-inline-space-ratio, 1));
                }

                & > i.s-when--active {
                    display: none;
                }
                &.active, &[active] {
                    & > i.s-when--active {
                        display: inline-block;

                        & + i {
                            display: none;
                        }
                    }
                }

                &.active > *:not(ul):not(ol):not(i) {
                    font-weight: bold;
                }

                &:not(.active, [active]) > ul,
                &:not(.active, [active]) > ol {
                    display: none;
                }


                & > [tabindex]:focus:not(:hover):not(.s-disabled &) {
                    @sugar.outline;
                }

                &:hover, &:focus, &:focus-within {

                    > ul > li:before,
                    > ol > li:before {
                        background-color: sugar.color(current, --alpha 0.5);
                    }
                }
            }

            @sugar.direction.rtl {
                ul, ol {
                    li {
                        &:before {
                            top: 0;
                            right: calc(0.15em * var(--s-fs-tree-inline-space-ratio, 1));
                            left: auto;
                        }
                    }
                }

                li {
                    & > i {
                        right: calc(1em * var(--s-fs-tree-inline-space-ratio, 1));
                        left: auto;
                    }
                }
            }

        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            
        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

                    li:not(.s-disabled) {
                        a:hover,
                        span:hover {
                            background-color: sugar.color(current, surface);
                        }
                    }

                `);
                break;
        }
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    li {
                        & > *:not(ul):not(ol):not(i) {
                            border-radius: 0;
                        }
                    }
                `);
                break;
            case 'pill':
                vars.push(`
                    li {
                        & > *:not(ul):not(ol):not(i) {
                            border-radius: 9999px;
                        }
                    }
                `);
                break;
            default:
                vars.push(`
                    li {
                        & > *:not(ul):not(ol):not(i) {
                            border-radius: sugar.theme(ui.fsTree.borderRadius);
                        }
                    }
                `);
                break;
        }
    }

    return vars;
}
