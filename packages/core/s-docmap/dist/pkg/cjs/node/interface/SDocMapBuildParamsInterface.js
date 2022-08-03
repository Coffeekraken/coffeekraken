"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDocmapBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            globs: {
                type: 'Array<String>',
                description: 'Specify some globs to use to search docblocks to use in docmap generation',
                default: s_sugar_config_1.default.get('docmap.build.globs'),
            },
            exclude: {
                type: 'Array<String>',
                description: 'Specify some regexp used to exclude files from resulting docMap',
                default: s_sugar_config_1.default.get('docmap.build.exclude'),
                level: 1,
            },
            tags: {
                type: 'Array<String>',
                description: 'Specify which docblock tags you want in your final docmap.json file',
                alias: 'f',
                default: s_sugar_config_1.default.get('docmap.build.tags'),
            },
            filters: {
                type: 'Object<RegExp>',
                description: 'Specify some properties and regex to use to filter docblocks',
                default: s_sugar_config_1.default.get('docmap.build.filters'),
            },
            noExtends: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                description: 'Specify if you want to avoid searching for docmap.json files in the dependency packages',
                default: s_sugar_config_1.default.get('docmap.build.noExtends'),
            },
            save: {
                type: 'Boolean',
                alias: 's',
                description: 'Specify if you want to save the generated file under the ```outPath``` path',
                default: s_sugar_config_1.default.get('docmap.build.save'),
            },
            outPath: {
                type: 'String',
                alias: 'o',
                description: 'Specify where you want to save the builded file. Usually saved in package root with the name docmap.json',
                default: s_sugar_config_1.default.get('docmap.build.outPath'),
            },
        };
    }
}
exports.default = SDocmapBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2xELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLE9BQU8sRUFBRSx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsT0FBTyxFQUFFLHdCQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQ1AscUVBQXFFO2dCQUN6RSxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDbEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsT0FBTyxFQUFFLHdCQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3JEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsV0FBVyxFQUNQLHlGQUF5RjtnQkFDN0YsT0FBTyxFQUFFLHdCQUFhLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ3ZEO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLE9BQU8sRUFBRSx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUNsRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsMEdBQTBHO2dCQUM5RyxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDckQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0Qsa0JBQWUsMkJBQTJCLENBQUMifQ==