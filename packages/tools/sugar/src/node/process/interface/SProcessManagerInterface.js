"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessManagerInterface extends SInterface_1.default {
    },
    // static extendsArray = ['SProcess', 'SPromise'];
    _a.definition = {
        run: {
            type: 'Function',
            required: true
        },
        kill: {
            type: 'Function',
            required: true
        }
    },
    _a.title = 'SProcess elements Interface',
    _a.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit',
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NNYW5hZ2VySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQWNsRCx1QkFBUyxNQUFNLHdCQUF5QixTQUFRLG9CQUFZO0tBZ0IzRDtJQWZDLGtEQUFrRDtJQUMzQyxhQUFVLEdBQUc7UUFDbEIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFVBQVU7WUFDaEIsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxVQUFVO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRDtJQUVLLFFBQUssR0FBRyw2QkFBOEI7SUFDdEMsY0FBVyxHQUNoQixvSUFBcUk7UUFDdkkifQ==