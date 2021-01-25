"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessDeamonSettingInterface extends SInterface_1.default {
    },
    _a.definition = {
        class: {
            type: 'Class',
            required: true,
            description: 'The SDeamon based class to use'
        },
        watchArgs: {
            type: 'Array',
            required: true,
            description: 'An array of arguments that will be passed to the "watch" method of the deamon'
        },
        processParams: {
            type: 'Function',
            description: 'An optional function that will take as arguments the initial process params and the data send by the deamon. You then can update the params depending on the data from the deamon and return the new params object to send to the "run" process method'
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NEZWFtb25TZXR0aW5nSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NEZWFtb25TZXR0aW5nSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQWNsRCx1QkFBUyxNQUFNLDhCQUErQixTQUFRLG9CQUFZO0tBbUJqRTtJQWxCUSxhQUFVLEdBQUc7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7U0FDOUM7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUNULCtFQUErRTtTQUNsRjtRQUNELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFDVCx3UEFBd1A7U0FDM1A7S0FDRDtRQUNGIn0=