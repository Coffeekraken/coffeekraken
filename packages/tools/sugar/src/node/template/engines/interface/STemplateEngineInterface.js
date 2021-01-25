"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
module.exports = (_a = class STemplateEngineInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String',
            required: true,
            values: ['path', 'string'],
            static: true,
            description: 'Specify if the template engine class support a view path as input, or a template string',
            default: 'path',
            level: 1
        },
        canRender: {
            type: 'Function',
            required: true,
            static: true,
            description: 'A simple method that take parameter a templateString and must return true if it can handle it, false if not'
        },
        render: {
            type: 'Function',
            required: true,
            description: 'Main render method that must return an SPromise instance resolved once the rendering process has been successfully completed'
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlRW5naW5lSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RlbXBsYXRlRW5naW5lSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQW9CckQsdUJBQVMsTUFBTSx3QkFBeUIsU0FBUSxvQkFBWTtLQTBCM0Q7SUF6QlEsYUFBVSxHQUFHO1FBQ2xCLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzFCLE1BQU0sRUFBRSxJQUFJO1lBQ1osV0FBVyxFQUNULHlGQUF5RjtZQUMzRixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osV0FBVyxFQUNULDZHQUE2RztTQUNoSDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUNULDhIQUE4SDtTQUNqSTtLQUNEO1FBQ0YifQ==