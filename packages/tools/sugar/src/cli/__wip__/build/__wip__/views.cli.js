"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildViewsCli_1 = __importDefault(require("../../node/build/views/SBuildViewsCli"));
const SBuildViewsActionsStream_1 = __importDefault(require("../../node/build/views/SBuildViewsActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definition: SBuildViewsCli_1.default.interface.definition
    });
    const stream = new SBuildViewsActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlld3MuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlFQUFtRDtBQUNuRCwyRkFBb0U7QUFDcEUsK0dBQXlGO0FBQ3pGLHVFQUFpRDtBQUVqRCxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLFVBQVUsRUFBRTtRQUNuQyxVQUFVLEVBQUUsd0JBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVTtLQUNqRCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtDQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMifQ==