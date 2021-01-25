"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const SDeamonInterface_1 = __importDefault(require("../../interface/SDeamonInterface"));
module.exports = (_a = class SFsDeamonInterface extends SInterface_1.default {
    },
    _a.implementsArray = [SDeamonInterface_1.default],
    _a.definition = {
        watch: {
            type: 'String',
            alias: 'i',
            description: 'Specify what to watch using a glob pattern',
            required: true,
            level: 1
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzRGVhbW9uSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUNyRCx3RkFBa0U7QUFvQmxFLHVCQUFTLE1BQU0sa0JBQW1CLFNBQVEsb0JBQVk7S0FZckQ7SUFYUSxrQkFBZSxHQUFHLENBQUMsMEJBQWtCLENBQUU7SUFFdkMsYUFBVSxHQUFHO1FBQ2xCLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNEO1FBQ0YifQ==