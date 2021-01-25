"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SSvelteCompilerParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the requirement
 * needed for a svelte compilation process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompilerParamsInterface extends SInterface_1.default {
}
SSvelteCompilerParamsInterface.definition = {
    input: {
        type: 'String|Array<String>',
        default: sugar_1.default('svelte.compile.input'),
        alias: 'i'
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('svelte.compile.outputDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('svelte.compile.rootDir')
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
        default: sugar_1.default('svelte.compile.style') || 'expanded',
        level: 1
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('svelte.compile.map') || true,
        level: 1
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.minify')
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.prod')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('svelte.compile.banner')
    },
    svelte: {
        type: 'Object',
        description: 'Object passed to the svelte compiler',
        default: sugar_1.default('svelte.compile.svelte') || {},
        level: 2
    }
};
exports.default = SSvelteCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxrRUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLDhCQUErQixTQUFRLG9CQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUM5QyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO1FBQ2xELEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsd0JBQXdCLENBQUM7S0FDakQ7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxPQUFPLEVBQUUsZUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksVUFBVTtRQUM1RCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUk7UUFDcEQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyw4QkFBOEIsQ0FBQztLQUN2RDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlGQUF5RjtRQUMzRixPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFO1FBQ3JELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osa0JBQWUsOEJBQThCLENBQUMifQ==