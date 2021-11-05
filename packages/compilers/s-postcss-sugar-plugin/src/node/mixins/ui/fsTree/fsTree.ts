import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiFsTreeInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __STheme.config('ui.fsTree.defaultStyle'),
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
}

export interface IPostcssSugarPluginUiFsTreeParams {
    style: 'solid';
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
        scope: ['bare', 'lnf'],
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

    return vars;
}
