import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SRefocusFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SRefocusFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SRefocusFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            trigger: {
                description: 'Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['event:eventName', 'anchor', 'history'],
                default: [],
            },
            timeout: {
                description: 'Specify a timeout to wait before refocus the element',
                type: 'Number',
                default: 500,
            },
            duration: {
                description: 'Specify the duration of the refocus animation',
                type: 'Number',
            },
            easing: {
                description: 'Specify the easing function of the refocus animation',
                type: 'Function',
            },
            focusedClass: {
                description: 'Specify the class to add when the target element has been focused',
                type: 'String|Boolean',
                default: 'focused',
            },
            focusedClassDuration: {
                description: 'Specify how many ms the focused class has to be added, then removed',
                type: 'Number',
                default: 1000,
            },
            offset: {
                description: 'Specify the offset of the refocus animation in px',
                type: 'Number',
            },
            offsetX: {
                description: 'Specify the offset x of the refocus animation in px',
                type: 'Number',
            },
            offsetY: {
                description: 'Specify the offset y of the refocus animation in px',
                type: 'Number',
            },
            align: {
                description: 'Specify the alignment of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
            justify: {
                description: 'Specify the justification of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxtSEFBbUg7Z0JBQ3ZILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1FQUFtRTtnQkFDdkUsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7YUFDckM7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLG9EQUFvRDtnQkFDeEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7YUFDckM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=