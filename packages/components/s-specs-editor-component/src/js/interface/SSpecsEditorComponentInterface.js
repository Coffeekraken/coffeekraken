import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSpecsEditorComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSpecsEditorComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSpecsEditorComponentInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
                title: 'Id',
                description:
                    'Specify an id for your specs editor to be able to save his state',
            },
            specs: {
                type: 'Object',
                title: 'Specs',
                description:
                    'Specify the SSpecs resulting json to use for the editor',
                required: true,
            },
            frontspec: {
                type: 'Object',
                title: 'Frontspec',
                description:
                    'Specify the frontspec json to make use of it for things like media, etc...',
            },
            media: {
                type: 'String',
                title: 'Specs',
                description:
                    'Specify the media on which the specs editor is currently working',
            },
            icons: {
                type: 'Object',
                title: 'Icons',
                description:
                    'Specify some icons html used across the interface',
                default: {
                    clear: '<i class="fa-solid fa-xmark"></i>',
                    add: '<i class="fa-solid fa-plus"></i>',
                    expand: '<i class="fa-solid fa-plus"></i>',
                    remove: '<i class="fa-solid fa-minus"></i>',
                    collapse: '<i class="fa-solid fa-minus"></i>',
                    mobile: '<i class="fa-solid fa-mobile-screen-button"></i>',
                    tablet: '<i class="fa-solid fa-tablet-screen-button"></i>',
                    desktop: '<i class="fa-solid fa-desktop"></i>',
                    wide: '<i class="fa-solid fa-arrows-left-right"></i>',
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyw4QkFBK0IsU0FBUSxZQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsV0FBVyxFQUNQLGtFQUFrRTthQUN6RTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUNQLDRFQUE0RTthQUNuRjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQ1Asa0VBQWtFO2FBQ3pFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsbUNBQW1DO29CQUMxQyxHQUFHLEVBQUUsa0NBQWtDO29CQUN2QyxNQUFNLEVBQUUsa0NBQWtDO29CQUMxQyxNQUFNLEVBQUUsbUNBQW1DO29CQUMzQyxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxNQUFNLEVBQUUsa0RBQWtEO29CQUMxRCxNQUFNLEVBQUUsa0RBQWtEO29CQUMxRCxPQUFPLEVBQUUscUNBQXFDO29CQUM5QyxJQUFJLEVBQUUsK0NBQStDO2lCQUN4RDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
