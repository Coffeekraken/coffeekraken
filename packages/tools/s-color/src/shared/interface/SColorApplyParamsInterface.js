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
}
SColorApplyParamsInterface.definition = {
    desaturate: {
        type: 'Number',
        default: 0,
        alias: 'd',
        description: 'Allows you to desaturate the color using a percentage'
    },
    saturate: {
        type: 'Number',
        default: 0,
        alias: 's',
        description: 'Allows you to saturate the color using a percentage'
    },
    greyscale: {
        type: 'Boolean',
        default: false,
        alias: 'g',
        description: 'Allows you to get back the grayscale version of your color'
    },
    spin: {
        type: 'Number',
        default: 0,
        description: 'Spin the hue on the passed value (max 360)'
    },
    transparentize: {
        type: 'Number',
        default: 0,
        description: 'The amount of transparence to apply between 0-100|0-1'
    },
    alpha: {
        type: 'Number',
        default: 0,
        alias: 'a',
        description: 'The new alpha value to apply between 0-100|0-1'
    },
    opacity: {
        type: 'Number',
        default: 0,
        alias: 'o',
        description: 'The new alpha value to apply between 0-100|0-1'
    },
    opacify: {
        type: 'Number',
        default: 0,
        description: 'The amount of transparence to remove between 0-100|0-1'
    },
    darken: {
        type: 'Number',
        default: 0,
        description: 'The amount of darkness (of the nightmare of the shadow) to apply between 0-100'
    },
    lighten: {
        type: 'Number',
        default: 0,
        alias: 'l',
        description: 'The amount of lightness (of the sky of the angels) to apply between 0-100'
    },
    invert: {
        type: 'Boolean',
        default: false,
        alias: 'i',
        description: 'Specify if you want to invert the color to keep a good contrast ratio with a background for example'
    }
};
export default SColorApplyParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yQXBwbHlQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29sb3JBcHBseVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLFlBQVk7O0FBQzVDLHFDQUFVLEdBQUc7SUFDbEIsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLHVEQUF1RDtLQUNyRTtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxxREFBcUQ7S0FDbkU7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsNERBQTREO0tBQzFFO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLFdBQVcsRUFBRSw0Q0FBNEM7S0FDMUQ7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsV0FBVyxFQUFFLHVEQUF1RDtLQUNyRTtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsZ0RBQWdEO0tBQzlEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLFdBQVcsRUFBRSx3REFBd0Q7S0FDdEU7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsV0FBVyxFQUNULGdGQUFnRjtLQUNuRjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCwyRUFBMkU7S0FDOUU7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QscUdBQXFHO0tBQ3hHO0NBQ0YsQ0FBQztBQUdKLGVBQWUsMEJBQTBCLENBQUMifQ==