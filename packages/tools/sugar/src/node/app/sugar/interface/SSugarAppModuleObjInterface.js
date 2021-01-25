"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../../interface/SInterface');
const __sugarConfig = require('../../../config/sugar');
const __SSugarAppModulePresetInterface = require('./SSugarAppModulePresetInterface');
module.exports = (_a = class SSugarAppModuleObjInterface extends __SInterface {
    },
    _a.definition = {
        id: {
            type: 'String',
            description: 'A simple one word id that will be used to identify this module',
            required: true
        },
        name: {
            type: 'String',
            description: 'The module name like "Frontend Server", etc...',
            required: true
        },
        description: {
            type: 'String',
            description: 'The module description',
            required: false
        },
        autoRun: {
            type: 'Boolean',
            description: 'Specify if you want your module to run automatically after loading',
            required: false,
            default: false
        },
        modulePath: {
            type: 'String',
            description: 'The SSugarUiModule based class file path.',
            required: true,
            path: {
                exists: true
            }
        },
        processPath: {
            type: 'String',
            description: 'The SProcess based class file path',
            required: false,
            path: {
                exists: true
            }
        },
        presets: {
            type: 'Object<SSugarAppModulePreset>',
            description: 'An object of presets objects to use with the registered process',
            required: true
        },
        params: {
            type: 'Object',
            description: 'An object of parameters that will be used in your module class instance',
            required: true,
            default: {}
        },
        settings: {
            type: 'Object',
            description: 'An object of settings that will be used in your modules class instance',
            required: true,
            default: {}
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlT2JqSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlT2JqSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzlELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sZ0NBQWdDLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFtQnJGLHVCQUFTLE1BQU0sMkJBQTRCLFNBQVEsWUFBWTtLQThEOUQ7SUE3RFEsYUFBVSxHQUFHO1FBQ2xCLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUNULGdFQUFnRTtZQUNsRSxRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsUUFBUSxFQUFFLEtBQUs7U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsU0FBUztZQUNmLFdBQVcsRUFDVCxvRUFBb0U7WUFDdEUsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsSUFBSTthQUNiO1NBQ0Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsK0JBQStCO1lBQ3JDLFdBQVcsRUFDVCxpRUFBaUU7WUFDbkUsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUNULHlFQUF5RTtZQUMzRSxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFDVCx3RUFBd0U7WUFDMUUsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsRUFBRTtTQUNaO0tBQ0Q7UUFDRiJ9