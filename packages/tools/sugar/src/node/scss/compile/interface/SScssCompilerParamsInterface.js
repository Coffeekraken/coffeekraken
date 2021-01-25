"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SScssCompilerParamsInterface
 * @namespace           sugar.node.scss.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssCompilerParamsInterface extends SInterface_1.default {
}
SScssCompilerParamsInterface.definition = {
    input: {
        type: 'String|Array<String>',
        default: sugar_1.default('scss.compile.input'),
        alias: 'i'
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('scss.compile.outputDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('scss.compile.rootDir')
    },
    save: {
        type: 'Boolean',
        default: false
    },
    watch: {
        type: 'Boolean',
        default: false
    },
    style: {
        type: 'String',
        alias: 's',
        description: 'Output style (nested,expanded,compact,compressed)',
        default: sugar_1.default('scss.compile.style') || 'expanded',
        level: 1
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('scss.compile.map') || true,
        level: 1
    },
    cache: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.cache')
    },
    clearCache: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.clearCache')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.minify')
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('scss.compile.prod')
    },
    sharedResources: {
        type: 'String|Array<String>',
        alias: 'r',
        description: 'Specify some files to load in every imported files using @use or @import',
        default: sugar_1.default('scss.compile.sharedResources'),
        level: 1
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('scss.compile.banner')
    },
    sass: {
        type: 'Object',
        description: 'Object passed to the sass compiler',
        default: sugar_1.default('scss.compile.sass') || {},
        level: 2
    }
};
exports.default = SScssCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlclBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3NzQ29tcGlsZXJQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBQ3pELGtFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sNEJBQTZCLFNBQVEsb0JBQVk7O0FBQzlDLHVDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQzVDLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsd0JBQXdCLENBQUM7UUFDaEQsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsbURBQW1EO1FBQ2hFLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxVQUFVO1FBQzFELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksSUFBSTtRQUNsRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLHlCQUF5QixDQUFDO0tBQ2xEO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLDRCQUE0QixDQUFDO0tBQ3JEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCwwRUFBMEU7UUFDNUUsT0FBTyxFQUFFLGVBQWEsQ0FBQyw4QkFBOEIsQ0FBQztRQUN0RCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxvQ0FBb0M7UUFDakQsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUU7UUFDakQsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFHSixrQkFBZSw0QkFBNEIsQ0FBQyJ9