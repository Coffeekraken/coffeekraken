import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          fsTree
 * @as              @s.ui.fsTree
 * @namespace    node.mixin.ui.fsTree
 * @type               PostcssMixin
 * @interface     ./fsTree          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the fsTree style to any element
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.fsTree
 *
 * @example     css
 * .my-fsTree {
 *    @s.ui.fsTree;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFsTreeInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFsTreeParams {
    scope: string[];
}

export { postcssSugarPluginUiFsTreeInterface as interface };

export default function ({
    params,
    atRule,
    atRootStart,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFsTreeParams>;
    atRule: any;
    atRootStart: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFsTreeParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    atRootStart(`
         :root {
            --s-fs-tree-inline-space-ratio: 2.9;
        }
    `);

    // &:after {
    //     content: '';
    //     display: block;
    //     font-weight:bold;
    //     position: absolute;
    //     z-index: -1;
    //     bottom: 0;
    //     left: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
    //     width: 1em;
    //     height: 1px;
    //     background-color: s.color(current, border);
    // }

    // &:before {
    //     content: '';
    //     display: block;
    //     font-weight:bold;
    //     position: absolute;
    //     z-index: -1;
    //     top: 0;
    //     left: 0.5em;
    //     width: 1px; height: 100%;
    //     background-color: s.color(current, border);
    // }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.font.size(30);
            user-select: none;

            li > div {
                position: relative;
                margin-inline-start: cale(1em * var(--s-fs-tree-inline-space-ratio, 1));
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                > a {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            li {
                position: relative;

                > div {
                    padding-inline: s.padding(ui.fsTree.paddingInline);
                    padding-block: s.padding(ui.fsTree.paddingBlock);
                    text-overflow: ellipsis;
                    @s.shape();
                }

                &:not(.s-disabled &) {
                    cursor: pointer;
                }

                & > i.s-when-active,
                & > div > i.s-when-active {
                    display: none;
                }
                &.active, &[active] {
                    & > i.s-when-active,
                    & > div i.s-when-active {
                        display: inline-block;

                        & + i {
                            display: none;
                        }
                    }
                }

                &.active, &[active] {
                    & > div {
                        font-weight: bold;
                    }
                }

                &:not(.active, [active]) > ul,
                &:not(.active, [active]) > ol {
                    display: none;
                }


                & > [tabindex]:focus:not(:hover):not(.s-disabled &) {
                    @s.outline;
                }

                & > ul,
                & > ol {
                    margin-inline-start: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
                }

                &:hover, &:focus, &:focus-within {

                    > ul > li:before,
                    > ol > li:before {
                        background-color: s.color(current, --alpha 0.5);
                    }
                }
            }

            @s.direction.rtl {
                ul, ol {
                    li > div {
                        &:before {
                            top: 0;
                            right: calc(0.15em * var(--s-fs-tree-inline-space-ratio, 1));
                            left: auto;
                        }
                        &:after {
                            bottom: 0;
                            left: auto;
                            right: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
                        }
                    }
                }
            }

        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            
        `);

        vars.push(`
            li:not(.s-disabled) {
                > div:hover {
                    background-color: s.color(current, surface);
                }
            }
        `);
    }

    return vars;
}
