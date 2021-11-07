import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SColorApplyParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColorApplyParamsInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            desaturate: {
                type: 'Number',
                default: 0,
                alias: 'd',
                description: 'Allows you to desaturate the color using a percentage',
            },
            saturate: {
                type: 'Number',
                default: 0,
                alias: 's',
                description: 'Allows you to saturate the color using a percentage',
            },
            greyscale: {
                type: 'Boolean',
                default: false,
                alias: 'g',
                description: 'Allows you to get back the grayscale version of your color',
            },
            spin: {
                type: 'Number',
                default: 0,
                description: 'Spin the hue on the passed value (max 360)',
            },
            transparentize: {
                type: 'Number',
                default: 0,
                description: 'The amount of transparence to apply between 0-100|0-1',
            },
            alpha: {
                type: 'Number',
                default: 0,
                alias: 'a',
                description: 'The new alpha value to apply between 0-100|0-1',
            },
            opacity: {
                type: 'Number',
                default: 0,
                alias: 'o',
                description: 'The new alpha value to apply between 0-100|0-1',
            },
            opacify: {
                type: 'Number',
                default: 0,
                description: 'The amount of transparence to remove between 0-100|0-1',
            },
            darken: {
                type: 'Number',
                default: 0,
                description: 'The amount of darkness (of the nightmare of the shadow) to apply between 0-100',
            },
            lighten: {
                type: 'Number',
                default: 0,
                alias: 'l',
                description: 'The amount of lightness (of the sky of the angels) to apply between 0-100',
            },
            invert: {
                type: 'Boolean',
                default: false,
                alias: 'i',
                description: 'Specify if you want to invert the color to keep a good contrast ratio with a background for example',
            },
        }));
    }
}
export default SColorApplyParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yQXBwbHlQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29sb3JBcHBseVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7SUFDakQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsbUNBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsdURBQXVEO2FBQzlEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCxxREFBcUQ7YUFDNUQ7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDREQUE0RDthQUNuRTtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixXQUFXLEVBQUUsNENBQTRDO2FBQzVEO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFdBQVcsRUFDUCx1REFBdUQ7YUFDOUQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLGdEQUFnRDthQUN2RDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsZ0RBQWdEO2FBQ3ZEO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFdBQVcsRUFDUCx3REFBd0Q7YUFDL0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsV0FBVyxFQUNQLGdGQUFnRjthQUN2RjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsMkVBQTJFO2FBQ2xGO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCxxR0FBcUc7YUFDNUc7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsMEJBQTBCLENBQUMifQ==