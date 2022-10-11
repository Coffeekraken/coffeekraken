"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const easing_1 = require("@coffeekraken/sugar/easing");
/**
 * @name                SSliderComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSliderComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSliderComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            direction: {
                description: 'Specify the slider direction. Can be `horizontal` or `vertical`',
                values: ['horizontal', 'vertical'],
                type: 'String',
                physical: true,
                default: 'horizontal',
            },
            behaviors: {
                description: 'Specify the available behaviors for the slider',
                type: 'Object',
                default: {},
            },
            behavior: {
                description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
                values: ['none', 'default'],
                type: 'String',
                default: 'default',
                physical: true,
            },
            nextIconClass: {
                description: 'Specify the class of the next icon',
                type: 'String',
            },
            previousIconClass: {
                description: 'Specify the class of the previous icon',
                type: 'String',
            },
            controls: {
                description: 'Specify if you want to display the controls or not. Controls are the previous and next icons',
                type: 'Boolean',
                default: false,
            },
            nav: {
                description: 'Specify if you want to display the nav or not. Nav are the dots',
                type: 'Boolean',
                default: false,
            },
            swipe: {
                description: 'Specify if you want your slider to support swipe navigation or not',
                type: 'Boolean',
                default: false,
            },
            mousewheel: {
                description: 'Specify if you want to enable the mousewheel event on the slider or not',
                type: 'Boolean',
                default: false,
            },
            clickOnSlide: {
                description: 'Specify if you want to enable the click on the slides to navigate or not',
                type: 'Boolean',
                default: false,
            },
            loop: {
                description: 'Specify if you want to enable the loop behavior or not',
                type: 'Boolean',
                default: false,
            },
            slide: {
                description: 'Specify the active slide id',
                type: 'Number',
                default: 0,
                physical: true,
            },
            progress: {
                description: 'Specify if you want to display the progress bar or not',
                type: 'Boolean',
                default: false,
            },
            timer: {
                description: 'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
                type: 'Number',
            },
            autoplay: {
                description: 'Specify if you want the slider to auto play itself when some timer(s) has been set',
                type: 'Boolean',
                default: true,
            },
            intersectionClasses: {
                description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
                type: 'Boolean',
                default: false,
            },
            transitionDuration: {
                description: 'Specify the transition duration of the slider in ms',
                type: 'Number',
                default: 500,
            },
            transitionEasing: {
                description: 'Specify the transition easing of the slider',
                type: 'Function',
                default: easing_1.__easeOutQuad,
            },
            transitionHandler: {
                description: 'Specify a function that will take care of transitioning the slider from the current item to the next/previous',
                type: 'Function',
            },
            cssDeps: {
                description: 'Specify some css url(s) or link tag id(s) to inject into the shadowRoot of the component',
                type: 'String[]',
                default: ['slider'],
            },
        };
    }
}
exports.default = SSliderComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHVEQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQix5QkFBMEIsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLHdIQUF3SDtnQkFDNUgsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztnQkFDM0IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDhGQUE4RjtnQkFDbEcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG9FQUFvRTtnQkFDeEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHlFQUF5RTtnQkFDN0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDBFQUEwRTtnQkFDOUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHdEQUF3RDtnQkFDNUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLHdEQUF3RDtnQkFDNUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDRMQUE0TDtnQkFDaE0sSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLG9GQUFvRjtnQkFDeEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxtQkFBbUIsRUFBRTtnQkFDakIsV0FBVyxFQUNQLDZHQUE2RztnQkFDakgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsc0JBQWE7YUFDekI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQ1AsK0dBQStHO2dCQUNuSCxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsMEZBQTBGO2dCQUM5RixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ3RCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXpIRCw0Q0F5SEMifQ==