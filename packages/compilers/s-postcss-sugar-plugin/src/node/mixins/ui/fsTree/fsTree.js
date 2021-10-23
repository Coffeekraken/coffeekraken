import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFsTreeInterface extends __SInterface {
}
postcssSugarPluginUiFsTreeInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.fsTree.defaultStyle'),
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
export { postcssSugarPluginUiFsTreeInterface as interface };
export default function ({ params, atRule, atRootStart, applyNoScopes, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', scope: ['bare', 'lnf'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnNUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztLQUMzQjtDQUNKLENBQUM7QUFRTixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFdBQVcsR0FRZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFDRixXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFdBQVcsQ0FBQzs7OztLQUlYLENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXVHVCxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7aUJBU1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==