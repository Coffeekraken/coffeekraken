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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yQXBwbHlQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zLWNvbG9yL3NyYy9zaGFyZWQvaW50ZXJmYWNlL1NDb2xvckFwcGx5UGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsWUFBWTs7QUFDNUMscUNBQVUsR0FBRztJQUNsQixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsdURBQXVEO0tBQ3JFO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLHFEQUFxRDtLQUNuRTtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSw0REFBNEQ7S0FDMUU7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsV0FBVyxFQUFFLDRDQUE0QztLQUMxRDtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixXQUFXLEVBQUUsdURBQXVEO0tBQ3JFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLGdEQUFnRDtLQUM5RDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsV0FBVyxFQUFFLHdEQUF3RDtLQUN0RTtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7UUFDVixXQUFXLEVBQ1QsZ0ZBQWdGO0tBQ25GO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNWLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULDJFQUEyRTtLQUM5RTtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCxxR0FBcUc7S0FDeEc7Q0FDRixDQUFDO0FBR0osZUFBZSwwQkFBMEIsQ0FBQyJ9