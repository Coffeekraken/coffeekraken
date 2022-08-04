import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           gradient
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a gradient on your elements
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.gradient(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGradientInterface extends __SInterface {
    static get _definition() {
        return {
            start: {
                type: 'String',
                required: true,
                alias: 's',
            },
            end: {
                type: 'String',
                required: true,
                alias: 'e',
            },
            type: {
                type: 'String',
                values: ['linear', 'radial'],
                default: 'linear',
            },
            x: {
                type: 'String',
            },
            y: {
                type: 'String',
            },
            angle: {
                type: 'Number | String',
                default: 0,
            },
            size: {
                type: 'String',
                default: 'farthest-side',
            },
        };
    }
}
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: 0, size: 'farthest-side' }, params);
    let startColorVar = finalParams.start, endColorVar = finalParams.end;
    const themeColorsObj = __STheme.get('color');
    if (startColorVar.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[startColorVar]) {
        startColorVar = `sugar.color(${startColorVar})`;
    }
    if (endColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[endColorVar]) {
        endColorVar = `sugar.color(${endColorVar})`;
    }
    const angleVar = typeof finalParams.angle === 'number'
        ? `${finalParams.angle}deg`
        : finalParams.angle;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZUFBZTthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsS0FBSyxFQUNSLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLENBQUMsRUFDUixJQUFJLEVBQUUsZUFBZSxJQUNsQixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ2pDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBRWxDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFN0MsSUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDL0I7UUFDRSxhQUFhLEdBQUcsZUFBZSxhQUFhLEdBQUcsQ0FBQztLQUNuRDtJQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2RSxXQUFXLEdBQUcsZUFBZSxXQUFXLEdBQUcsQ0FBQztLQUMvQztJQUVELE1BQU0sUUFBUSxHQUNWLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQ2pDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQUs7UUFDM0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFNUIsSUFBSSxXQUFXLEdBQUcsK0JBQStCLFFBQVEsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7SUFFeEcsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixXQUFXLEdBQUcsK0JBQStCLFdBQVcsQ0FBQyxJQUFJLE9BQU8sV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztLQUNwSjtJQUNELE1BQU0sSUFBSSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFckMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9