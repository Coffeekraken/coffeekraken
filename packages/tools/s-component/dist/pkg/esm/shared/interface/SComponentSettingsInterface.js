import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SComponentSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SComponentUtils settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SComponentSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            interface: {
                description: 'Specify an SInterface class to use as our properties definition',
                type: 'SInterface',
            },
            styleClasses: {
                description: 'Define if you want the "style" class in when using the className and uniqueClassName method',
                type: 'Boolean',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxZQUFZO2FBQ3JCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCw2RkFBNkY7Z0JBQ2pHLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9