"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                STsCompilerParamsInterface
 * @namespace           sugar.node.typescript.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a typescript compilation.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompilerParamsInterface extends SInterface_1.default {
}
STsCompilerParamsInterface.definition = {
    // ...__TscInterface.definition,
    input: {
        type: 'String|Array<String>',
        alias: 'i',
        default: sugar_1.default('ts.compile.input')
    },
    outputDir: {
        type: 'String',
        alias: 'o',
        default: sugar_1.default('ts.compile.outputDir')
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('ts.compile.rootDir')
    },
    map: {
        type: 'Boolean|String',
        values: [true, false, 'inline'],
        default: sugar_1.default('ts.compile.map')
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: sugar_1.default('ts.compile.prod')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.minify')
    },
    banner: {
        type: 'String',
        default: sugar_1.default('ts.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: sugar_1.default('ts.compile.watch')
    },
    target: {
        type: 'String',
        alias: 't',
        default: sugar_1.default('ts.compile.target')
    },
    compilerOptions: {
        type: 'Object',
        default: sugar_1.default('ts.compile.compilerOptions')
    }
};
exports.default = STsCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS90eXBlc2NyaXB0L2NvbXBpbGUvaW50ZXJmYWNlL1NUc0NvbXBpbGVyUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxrRUFBa0Q7QUFHbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLG9CQUFZOztBQUM1QyxxQ0FBVSxHQUFHO0lBQ2xCLGdDQUFnQztJQUNoQyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLHNCQUFzQixDQUFDO0tBQy9DO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUMvQixPQUFPLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO0tBQ3pDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsaUJBQWlCLENBQUM7S0FDMUM7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7S0FDbkQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsaUJBQWlCLENBQUM7S0FDMUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLDRCQUE0QixDQUFDO0tBQ3JEO0NBQ0YsQ0FBQztBQVlKLGtCQUFlLDBCQUEwQixDQUFDIn0=