"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SFrontendServerInterface extends SInterface_1.default {
    },
    _a.definition = {
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
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxrRUFBa0Q7QUFtQmxELHVCQUFTLE1BQU0sd0JBQXlCLFNBQVEsb0JBQVk7S0FnQzNEO0lBL0JRLGFBQVUsR0FBRztRQUNsQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixRQUFRLEVBQUUsSUFBSTtZQUNkLDhEQUE4RDtZQUM5RCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSxhQUFhO1lBQzFCLE9BQU8sRUFBRSxlQUFhLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSTtZQUMvQyxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE9BQU8sRUFDTCxlQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25FLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsT0FBTyxFQUNMLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFFBQVE7U0FDMUM7S0FDRDtRQUNGIn0=