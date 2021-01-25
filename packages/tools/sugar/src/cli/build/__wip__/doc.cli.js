"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SBuildDocCli_1 = __importDefault(require("../../node/build/doc/SBuildDocCli"));
const SBuildDocActionsStream_1 = __importDefault(require("../../node/build/doc/SBuildDocActionsStream"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definition: SBuildDocCli_1.default.interface.definition
    });
    const stream = new SBuildDocActionsStream_1.default({});
    const proc = stream.start(args);
    output_1.default(proc);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvYy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQseUVBQW1EO0FBQ25ELHFGQUErRDtBQUMvRCx5R0FBbUY7QUFDbkYsdUVBQWlEO0FBRWpELGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLG1CQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRSxzQkFBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVO0tBQ2hELENBQUMsQ0FBQztJQUNILE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQXdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9