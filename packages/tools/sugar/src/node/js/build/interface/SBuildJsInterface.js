"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SBuildJsCliInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String',
            default: sugar_1.default('build.js.input')
        },
        outputDir: {
            type: 'String',
            default: sugar_1.default('build.js.outputDir')
        },
        rootDir: {
            type: 'String',
            default: sugar_1.default('build.js.rootDir')
        },
        map: {
            type: 'Boolean',
            alias: 'm',
            description: 'Generate a sourcemap file',
            default: sugar_1.default('build.js.map'),
            level: 1
        },
        bundle: {
            type: 'Boolean',
            alias: 'b',
            description: 'Pack the files into a final one or just process the passed file',
            default: sugar_1.default('build.js.bundle'),
            level: 1
        },
        prod: {
            type: 'Boolean',
            alias: 'p',
            description: 'Specify the compiler that you want a "production" ready output',
            default: sugar_1.default('build.js.prod')
        },
        format: {
            type: 'String',
            values: ['iife', 'cjs', 'esm'],
            alias: 'f',
            description: 'Specify the format you want as output',
            default: sugar_1.default('build.js.format')
        },
        inject: {
            type: 'Array<String>',
            alias: 'i',
            description: 'Specify some files to inject in each processed files. Usefull for shiming, etc...',
            default: sugar_1.default('build.js.inject')
        },
        loader: {
            type: 'Object',
            alias: 'l',
            description: 'Specify some loader to use for specifiy extensions. Object format ```{".ext": "loader"}```',
            default: sugar_1.default('build.js.loader')
        },
        minify: {
            type: 'Boolean',
            alias: 'm',
            description: 'Specify if you want to minify the output generated code or not',
            default: sugar_1.default('build.js.minify')
        },
        platform: {
            type: 'String',
            values: ['browser', 'node'],
            description: 'Specify the platform you want to build the code for',
            default: sugar_1.default('build.js.platform')
        },
        target: {
            type: 'Array<String>',
            description: 'Specify the target(s) you want. Can be es2020, chrome{version}, firefox{version}, safari{version}, edge{version} or node{version}',
            default: sugar_1.default('build.js.target')
        },
        banner: {
            type: 'String',
            description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
            default: sugar_1.default('build.js.banner')
        },
        mainFields: {
            type: 'Array<String>',
            description: 'Specify the list of package.json properties you want the compiler to use to resolve dependencies. The order MATHER',
            default: sugar_1.default('build.js.mainFields')
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkSnNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRKc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwrRUFBeUQ7QUFDekQsa0VBQWtEO0FBbUJsRCx1QkFBUyxNQUFNLG9CQUFxQixTQUFRLG9CQUFZO0tBeUZ2RDtJQXhGUSxhQUFVLEdBQUc7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO1NBQ3pDO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO1NBQzdDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO1NBQzNDO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsT0FBTyxFQUFFLGVBQWEsQ0FBQyxjQUFjLENBQUM7WUFDdEMsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1QsaUVBQWlFO1lBQ25FLE9BQU8sRUFBRSxlQUFhLENBQUMsaUJBQWlCLENBQUM7WUFDekMsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1QsZ0VBQWdFO1lBQ2xFLE9BQU8sRUFBRSxlQUFhLENBQUMsZUFBZSxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUM5QixLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsT0FBTyxFQUFFLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQztTQUMxQztRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxlQUFlO1lBQ3JCLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUNULG1GQUFtRjtZQUNyRixPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDO1NBQzFDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFDVCw0RkFBNEY7WUFDOUYsT0FBTyxFQUFFLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQztTQUMxQztRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQ1QsZ0VBQWdFO1lBQ2xFLE9BQU8sRUFBRSxlQUFhLENBQUMsaUJBQWlCLENBQUM7U0FDMUM7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7WUFDM0IsV0FBVyxFQUFFLHFEQUFxRDtZQUNsRSxPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO1NBQzVDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLGVBQWU7WUFDckIsV0FBVyxFQUNULG1JQUFtSTtZQUNySSxPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDO1NBQzFDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQ1QseUZBQXlGO1lBQzNGLE9BQU8sRUFBRSxlQUFhLENBQUMsaUJBQWlCLENBQUM7U0FDMUM7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsZUFBZTtZQUNyQixXQUFXLEVBQ1Qsb0hBQW9IO1lBQ3RILE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7U0FDOUM7S0FDRDtRQUNGIn0=