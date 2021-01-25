"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SBuildScssInterface extends SInterface_1.default {
    },
    _a.definition = {
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
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkRnJvbnRzcGVjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUNyRCxrRUFBa0Q7QUFvQmxELHVCQUFTLE1BQU0sbUJBQW9CLFNBQVEsb0JBQVk7S0EwQ3REO0lBekNRLGFBQVUsR0FBRztRQUNsQixTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7WUFDbkQsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsZUFBZTtZQUNyQixPQUFPLEVBQUUsZUFBYSxDQUFDLHlCQUF5QixDQUFDO1lBQ2pELFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztZQUNsRCxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyx3QkFBd0IsQ0FBQztZQUNoRCxLQUFLLEVBQUUsR0FBRztZQUNWLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7WUFDbEQsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7WUFDL0MsS0FBSyxFQUFFLEdBQUc7WUFDVixLQUFLLEVBQUUsQ0FBQztTQUNUO0tBQ0Q7UUFDRiJ9