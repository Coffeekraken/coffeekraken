"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SPostcssCompilerInterface
 * @namespace           sugar.node.css.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
class SPostcssCompilerInterface extends s_interface_1.default {
}
SPostcssCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: sugar_1.default('css.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: sugar_1.default('css.compile.inDir'),
        alias: 'o'
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: sugar_1.default('css.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: sugar_1.default('css.compile.rootDir')
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        default: sugar_1.default('css.compile.bundle')
    },
    bundleSuffix: {
        type: 'String',
        default: sugar_1.default('css.compile.bundleSuffix')
    },
    map: {
        type: 'Boolean|String',
        alias: 'm',
        values: [true, false, 'inline'],
        description: 'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
        default: sugar_1.default('css.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: sugar_1.default('css.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('css.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('css.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: sugar_1.default('css.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: sugar_1.default('css.compile.watch')
    },
    postcss: {
        type: 'Object',
        description: 'Object passed to the postcss compiler',
        default: sugar_1.default('css.compile.postcss') || {},
        level: 2
    }
};
exports.default = SPostcssCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlckludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXJJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRkFBb0U7QUFDcEUsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0seUJBQTBCLFNBQVEscUJBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDM0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzQyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7S0FDbkQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDL0IsV0FBVyxFQUNULHVIQUF1SDtRQUN6SCxPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSTtRQUNqRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCx5RkFBeUY7UUFDM0YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFO1FBQ25ELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osa0JBQWUseUJBQXlCLENBQUMifQ==