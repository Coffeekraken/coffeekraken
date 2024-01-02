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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
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

class SSugarcssPluginUiFsTreeInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginUiFsTreeParams {}

export { SSugarcssPluginUiFsTreeInterface as interface };

export default function ({
    params,
    atRule,
    atRootStart,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiFsTreeParams>;
    atRule: any;
    atRootStart: Function;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiFsTreeParams = {
        ...params,
    };

    const vars: string[] = [];

    atRootStart(`
         :root {
            --s-fs-tree-inline-space-ratio: 2.9;
        }
    `);

    vars.push(`@s.scope 'bare' {`);
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
    vars.push('}');

    vars.push(`
           @s.scope 'lnf' { 
        `);

    vars.push(`
            li:not(.s-disabled) {
                > div:hover {
                    background-color: s.color(current, surface);
                }
            }
        `);

    vars.push('}');

    return vars;
}
