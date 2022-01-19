import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SRefocusFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SRefocusFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            trigger: {
                description: 'Specify some trigger(s) on which to refocus a particular element like "event:actual", "anchor", "history", etc...',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['event:eventName', 'anchor', 'history'],
                default: [],
            },
            scrollToSettings: {
                description: 'Specify some `scrollTo` settings to override the default ones',
                type: "IScrollToSettings",
                default: {}
            },
            timeout: {
                description: 'Specify a timeout to wait before refocus the element',
                type: 'Number',
                default: 500,
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlZm9jdXNGZWF0dXJlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1JlZm9jdXNGZWF0dXJlSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxtSEFBbUg7Z0JBQ3ZILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLCtEQUErRDtnQkFDNUUsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsc0RBQXNEO2dCQUNuRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsR0FBRzthQUNmO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9