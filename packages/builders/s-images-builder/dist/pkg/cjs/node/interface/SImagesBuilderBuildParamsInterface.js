"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SImagesBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SImagesBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SImagesBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glob pattern relative to the "inDir" to target images you want to process',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('imagesBuilder.glob'),
                alias: 'g',
            },
            compressExts: {
                description: 'Specify the file extensions you want to compress',
                type: 'String[]',
                required: true,
                default: s_sugar_config_1.default.get('imagesBuilder.compressExts')
            },
            inDir: {
                description: 'Specify the absolute path to the folder where your images stands',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('imagesBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description: 'Specify the absolute path to the folder you want to save your images. "inDir" folder structure is kept.',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('imagesBuilder.outDir'),
                alias: 'o',
            },
            quality: {
                description: 'Specify the quality percentage you want to target without the "%" sign',
                type: 'Number',
                required: true,
                default: s_sugar_config_1.default.get('imagesBuilder.quality'),
                alias: 'q',
            },
            webp: {
                description: 'Specify if you want to generate ".webp" versions of your images or not',
                type: 'Boolean',
                default: s_sugar_config_1.default.get('imagesBuilder.webp'),
            },
            width: {
                description: 'Specify the maximum width you want to target for your images',
                type: 'Number',
                default: s_sugar_config_1.default.get('imagesBuilder.width'),
                alias: 'w',
            },
            height: {
                description: 'Specify the maximum height you want to target for your images',
                type: 'Number',
                default: s_sugar_config_1.default.get('imagesBuilder.height'),
                alias: 'h',
            },
            resolution: {
                description: 'Specify some resolutions you want to generate. The targeted "width" and "height" is considered as the resolution 1 and all others resolutions are declined from this',
                type: 'Array<Integer>',
                default: s_sugar_config_1.default.get('imagesBuilder.resolution'),
                alias: 'r',
            },
            clear: {
                description: 'Specify if you want to clear the "outDir" before generate new images or not',
                type: 'Boolean',
                default: s_sugar_config_1.default.get('imagesBuilder.clear'),
                alias: 'c',
            },
            specificParams: {
                description: 'Allows you to specify some custom params depending on folder globs like "myCoolFolder/*.jpg" used as object property. Override every settings you want in this new object for the specified folder(s)',
                type: 'Object',
                default: s_sugar_config_1.default.get('imagesBuilder.specificParams'),
            },
        };
    }
}
exports.default = SImagesBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixrQ0FBbUMsU0FBUSxxQkFBWTtJQUN4RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxxRkFBcUY7Z0JBQ3pGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1Asa0RBQWtEO2dCQUN0RCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AseUdBQXlHO2dCQUM3RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHdFQUF3RTtnQkFDNUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNwRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx3RUFBd0U7Z0JBQzVFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxzS0FBc0s7Z0JBQzFLLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztnQkFDdkQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNkVBQTZFO2dCQUNqRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHVNQUF1TTtnQkFDM00sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXBGRCxxREFvRkMifQ==