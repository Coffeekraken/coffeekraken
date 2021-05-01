"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
        default: s_sugar_config_1.default('css.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: s_sugar_config_1.default('css.compile.inDir'),
        alias: 'o'
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: s_sugar_config_1.default('css.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: s_sugar_config_1.default('css.compile.rootDir')
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        default: s_sugar_config_1.default('css.compile.bundle')
    },
    bundleSuffix: {
        type: 'String',
        default: s_sugar_config_1.default('css.compile.bundleSuffix')
    },
    map: {
        type: 'Boolean|String',
        alias: 'm',
        values: [true, false, 'inline'],
        description: 'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
        default: s_sugar_config_1.default('css.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: s_sugar_config_1.default('css.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: s_sugar_config_1.default('css.compile.minify')
    },
    beautify: {
        type: 'Boolean',
        default: s_sugar_config_1.default('css.compile.beautify')
    },
    optimize: {
        type: 'Boolean',
        default: s_sugar_config_1.default('css.compile.optimize')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: s_sugar_config_1.default('css.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: s_sugar_config_1.default('css.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: s_sugar_config_1.default('css.compile.watch')
    },
    postcss: {
        type: 'Object',
        description: 'Object passed to the postcss compiler',
        default: s_sugar_config_1.default('css.compile.postcss') || {},
        level: 2
    }
};
exports.default = SPostcssCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlckludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXJJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0seUJBQTBCLFNBQVEscUJBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQzNDLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDM0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztRQUM1QyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsd0JBQWEsQ0FBQywwQkFBMEIsQ0FBQztLQUNuRDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUMvQixXQUFXLEVBQ1QsdUhBQXVIO1FBQ3pILE9BQU8sRUFBRSx3QkFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSTtRQUNqRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHNCQUFzQixDQUFDO0tBQy9DO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUU7UUFDbkQsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFHSixrQkFBZSx5QkFBeUIsQ0FBQyJ9