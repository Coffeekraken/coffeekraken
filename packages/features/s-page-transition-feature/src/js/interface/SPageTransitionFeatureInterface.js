import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SPageTransitionFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SPageTransitionFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPageTransitionFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            patchBody: {
                description: 'Specify if you want to patch the body tag with the new page body tag',
                type: 'Boolean',
                default: true
            },
            scrollTop: {
                description: 'Specify if you want to scroll to the top of the updated element after a transition',
                type: 'Boolean',
                default: true
            },
            before: {
                description: 'Specify a function to run before the transition',
                type: 'Function'
            },
            after: {
                description: 'Specify a function to run after the transition',
                type: 'Function'
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhZ2VUcmFuc2l0aW9uRmVhdHVyZUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQYWdlVHJhbnNpdGlvbkZlYXR1cmVJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxZQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLHNFQUFzRTtnQkFDbkYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLG9GQUFvRjtnQkFDakcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFVBQVU7YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=