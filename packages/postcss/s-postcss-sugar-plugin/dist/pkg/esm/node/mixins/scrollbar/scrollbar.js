import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           scrollbar
 * @as          @s.scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        stable
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @snippet         @s.scrollbar($1, $2, $3)
 *
 * @example        css
 * body {
 *    @s.scrollbar(accent, complementary, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScrollbarInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.color'),
            },
            background: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.color'),
            },
            size: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.size'),
            },
        };
    }
}
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`

        @s.lod.prevent {

            &::-webkit-scrollbar {
                width: ${finalParams.size};
                height: ${finalParams.size};
            }
            &::-webkit-scrollbar-track {
                    ${((_a = finalParams.background.match(/^s\.color/)) !== null && _a !== void 0 ? _a : finalParams.background.match(/^(var|hsla?|rgba?)\(/))
        ? `
                        background-color: ${finalParams.background};
                    `
        : `
                        background-color: s.color(${finalParams.background}, --alpha 0.1);
                    `}

            }
            &::-webkit-scrollbar-thumb {
                ${finalParams.color.match(/^s\.color/) ||
        finalParams.color.match(/^(var|hsla?|rgba?)\(/)
        ? `
                        background-color: ${finalParams.color};
                `
        : `
                    background-color: s.color(${finalParams.color}, --alpha 0.3);
                `}
            }
        }
  `);
    // wireframe
    vars.push(`
        @s.wireframe {
            &::-webkit-scrollbar-track {
                background-color: rgba(0,0,0,0.05);
                
                @s.theme dark {
                    background-color: rgba(255,255,255,0.05);
                }
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(0,0,0,0.1);
                
                @s.theme dark {
                    background-color: rgba(255,255,255,0.1);
                }
            }
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsS0FBSyxFQUFFLFFBQVEsRUFDZixVQUFVLEVBQUUsTUFBTSxJQUNmLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozt5QkFLVyxXQUFXLENBQUMsSUFBSTswQkFDZixXQUFXLENBQUMsSUFBSTs7O3NCQUlsQixDQUFBLE1BQUEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1DQUN6QyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUNoRCxDQUFDLENBQUM7NENBQ2MsV0FBVyxDQUFDLFVBQVU7cUJBQzdDO1FBQ08sQ0FBQyxDQUFDO29EQUNzQixXQUFXLENBQUMsVUFBVTtxQkFFdEQ7Ozs7a0JBS0EsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3BDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQzNDLENBQUMsQ0FBQzs0Q0FDa0IsV0FBVyxDQUFDLEtBQUs7aUJBQzVDO1FBQ08sQ0FBQyxDQUFDO2dEQUNzQixXQUFXLENBQUMsS0FBSztpQkFFakQ7OztHQUdiLENBQUMsQ0FBQztJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztLQWlCVCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=