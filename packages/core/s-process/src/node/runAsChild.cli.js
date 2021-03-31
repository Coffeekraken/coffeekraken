"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const ProcessClass = require(args.processPath).default; // eslint-disable-line
    if (ProcessClass.prototype instanceof s_process_1.default) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx5RkFBbUU7QUFDbkUsd0VBQWlEO0FBTWpELGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUE0QixtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3JCLE1BQU0sMkZBQTJGLENBQUM7S0FDbkc7SUFDRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtJQUM5RSxJQUFJLFlBQVksQ0FBQyxTQUFTLFlBQVksbUJBQVUsRUFBRTtRQUNoRCxNQUFNLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUMifQ==