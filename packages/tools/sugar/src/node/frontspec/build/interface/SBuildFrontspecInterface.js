"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SBuildScssInterface
 * @namespace           sugar.node.build.scss.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
class SBuildScssInterface extends SInterface_1.default {
}
exports.default = SBuildScssInterface;
SBuildScssInterface.definition = {
    outputDir: {
        type: 'String',
        default: sugar_1.default('build.frontspec.outputDir'),
        required: true,
        alias: 'o',
        level: 1
    },
    sources: {
        type: 'Array<Object>',
        default: sugar_1.default('build.frontspec.sources'),
        required: true,
        level: 1
    },
    filename: {
        type: 'String',
        default: sugar_1.default('build.frontspec.filename'),
        required: true,
        alias: 'n',
        level: 1
    },
    search: {
        type: 'String',
        default: sugar_1.default('build.frontspec.search'),
        alias: 's',
        level: 1
    },
    dirDepth: {
        type: 'Integer',
        default: sugar_1.default('build.frontspec.dirDepth'),
        required: true,
        alias: 'd',
        level: 1
    },
    cache: {
        type: 'Boolean',
        default: sugar_1.default('build.frontspec.cache'),
        alias: 'c',
        level: 1
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkRnJvbnRzcGVjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUNyRCxrRUFBa0Q7QUFHbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFxQixtQkFBb0IsU0FBUSxvQkFBWTs7QUFBN0Qsc0NBMENDO0FBekNRLDhCQUFVLEdBQUc7SUFDbEIsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLDJCQUEyQixDQUFDO1FBQ25ELFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQztRQUNqRCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7UUFDbEQsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsd0JBQXdCLENBQUM7UUFDaEQsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO1FBQ2xELFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUMifQ==