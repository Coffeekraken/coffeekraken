import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SActivateFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SActivateFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SActivateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            href: {
                description: 'Specify the target element(s) to activate/unactivate',
                type: 'String',
                default: '',
            },
            group: {
                description: 'Specify a group id for your element. This is used for things like tabs, etc...',
                type: 'String',
            },
            toggle: {
                description: 'Specify if you want to be able to click on the same element to activate/unactivate it.',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            history: {
                description: 'Specify if you want to store and react to history hash changes',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            active: {
                description: 'Specify the initial state of your element',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
                physical: true,
            },
            activeClass: {
                description: 'Specify the class applied on target(s) when active. Default is "active"',
                type: 'String',
                default: 'active',
            },
            activeAttribute: {
                description: 'Specify the attribute name applied on target(s) when active.',
                type: 'String',
                default: 'active',
            },
            saveState: {
                description: 'Specify if you want to save state in localStorage to restore it on page reload, etc...',
                type: 'Boolean',
                default: false,
            },
            activateTimeout: {
                description: 'Specify a timeout before actiavting the target(s)',
                type: 'Number',
                default: 0,
            },
            unactivateTimeout: {
                description: 'Specify a timeout before unactivate the target(s)',
                type: 'Number',
                default: 0,
            },
            triggerer: {
                description: 'Specify an element selector that will be used as the triggerer instead of this current element',
                type: 'String',
            },
            trigger: {
                description: 'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" and/or "anchor"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'click',
                    'mouseover',
                    'mouseenter',
                    'mouseout',
                    'mouseleave',
                    'anchor',
                ],
                default: ['click'],
            },
            unactivateOn: {
                description: 'Specify some event(s) catched on the body tag that will unactivate the target(s)',
                type: 'Array<String>',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGdGQUFnRjtnQkFDcEYsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxTQUFTO29CQUNmLGFBQWEsRUFBRSxJQUFJO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsZ0VBQWdFO2dCQUNwRSxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsYUFBYSxFQUFFLElBQUk7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHlFQUF5RTtnQkFDN0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLGdHQUFnRztnQkFDcEcsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDZHQUE2RztnQkFDakgsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixPQUFPO29CQUNQLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixVQUFVO29CQUNWLFlBQVk7b0JBQ1osUUFBUTtpQkFDWDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLGtGQUFrRjtnQkFDdEYsSUFBSSxFQUFFLGVBQWU7YUFDeEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=