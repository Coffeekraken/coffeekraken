"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SJsCompilerParamsInterface
 * @namespace           sugar.node.js.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe parameters of the SJsCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompilerParamsInterface extends SInterface_1.default {
}
SJsCompilerParamsInterface.definition = {
    input: {
        type: 'String|Array<String>',
        default: sugar_1.default('js.compile.input'),
        alias: 'i'
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('js.compile.outputDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('js.compile.rootDir')
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('js.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('js.compile.prod')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('js.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('js.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('js.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: sugar_1.default('js.compile.save')
    },
    watch: {
        type: 'Boolean',
        default: sugar_1.default('js.compile.watch')
    },
    esbuild: {
        type: 'Object',
        description: 'Object passed to the esbuild compiler',
        default: sugar_1.default('js.compile.esbuild') || {},
        level: 2
    }
};
exports.default = SJsCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlclBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtFQUF5RDtBQUN6RCxrRUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFDNUMscUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLE9BQU8sRUFBRSxlQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUM5QyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsT0FBTyxFQUFFLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUk7UUFDaEQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQztLQUMxQztJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztLQUNuRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlGQUF5RjtRQUMzRixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFO1FBQ2xELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osa0JBQWUsMEJBQTBCLENBQUMifQ==