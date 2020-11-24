"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
module.exports = (_a = class STemplateEngineInterface extends SInterface_1.default {
    },
    _a.definitionObj = {
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
