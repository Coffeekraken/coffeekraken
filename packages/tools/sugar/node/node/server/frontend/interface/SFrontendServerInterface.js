"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SFrontendServerInterface
 * @namespace           sugar.node.server.express.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontendServerInterface extends SInterface_1.default {
}
exports.default = SFrontendServerInterface;
SFrontendServerInterface.definition = {
    hostname: {
        type: 'String',
        alias: 'o',
        description: 'Server hostname',
        required: true,
        // default: __sugarConfig('frontend.hostname') || '127.0.0.1',
        level: 1
    },
    port: {
        type: 'Number',
        alias: 'p',
        description: 'Server port',
        default: sugar_1.default('frontend.port') || 3000,
        level: 1
    },
    rootDir: {
        type: 'String',
        description: 'Server root directory',
        default: sugar_1.default('frontend.rootDir') || __packageRoot(process.cwd()),
        level: 1
    },
    viewsDir: {
        type: 'String',
        description: 'Server views directory',
        default: sugar_1.default('frontend.viewsDir') ||
            __packageRoot(process.cwd()) + '/views'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvc2VydmVyL2Zyb250ZW5kL2ludGVyZmFjZS9TRnJvbnRlbmRTZXJ2ZXJJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBQ3pELGtFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLHdCQUF5QixTQUFRLG9CQUFZOztBQUFsRSwyQ0FnQ0M7QUEvQlEsbUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLGlCQUFpQjtRQUM5QixRQUFRLEVBQUUsSUFBSTtRQUNkLDhEQUE4RDtRQUM5RCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxhQUFhO1FBQzFCLE9BQU8sRUFBRSxlQUFhLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSTtRQUMvQyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLE9BQU8sRUFDTCxlQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25FLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsT0FBTyxFQUNMLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztZQUNsQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsUUFBUTtLQUMxQztDQUNGLENBQUMifQ==