"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          fsTree
 * @as              @sugar.ui.fsTree
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
 * @snippet         @sugar.ui.fsTree
 *
 * @example     css
 * .my-fsTree {
 *    @sugar.ui.fsTree;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFsTreeInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginUiFsTreeInterface;
function default_1({ params, atRule, atRootStart, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
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
    //     background-color: sugar.color(current, border);
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
    //     background-color: sugar.color(current, border);
    // }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.font.size(30);
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
                    padding-inline: sugar.padding(ui.fsTree.paddingInline);
                    padding-block: sugar.padding(ui.fsTree.paddingBlock);
                    text-overflow: ellipsis;
                    @sugar.shape();
                }

                &:not(.s-disabled &) {
                    cursor: pointer;
                }

                & > i.s-when--active,
                & > div > i.s-when--active {
                    display: none;
                }
                &.active, &[active] {
                    & > i.s-when--active,
                    & > div i.s-when--active {
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
                    @sugar.outline;
                }

                & > ul,
                & > ol {
                    margin-inline-start: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
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
                    background-color: sugar.color(current, surface);
                }
            }
        `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU0rQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsV0FBVyxDQUFDOzs7O0tBSVgsQ0FBQyxDQUFDO0lBRUgsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGtFQUFrRTtJQUNsRSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNEQUFzRDtJQUN0RCxJQUFJO0lBRUosYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsY0FBYztJQUNkLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsc0RBQXNEO0lBQ3RELElBQUk7SUFFSixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E4RlQsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1NBTVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbEtELDRCQWtLQyJ9