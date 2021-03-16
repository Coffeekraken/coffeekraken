"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildConfigCli_1 = __importDefault(require("../../node/build/SBuildConfigCli"));
const SBuildConfigActionsStream_1 = __importDefault(require("../../node/build/SBuildConfigActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definition: SBuildConfigCli_1.default.interface.definition
    });
    const stream = new SBuildConfigActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jbGkvX193aXBfXy9idWlsZC9fX3dpcF9fL2NvbmZpZy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQseUVBQW1EO0FBQ25ELHVGQUFpRTtBQUNqRSwyR0FBcUY7QUFDckYsdUVBQWlEO0FBRWpELGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRSx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBVTtLQUNuRCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLG1DQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMifQ==