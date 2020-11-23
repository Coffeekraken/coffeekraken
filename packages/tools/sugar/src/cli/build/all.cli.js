"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scss_cli_1 = __importDefault(require("./scss.cli"));
const js_cli_1 = __importDefault(require("./js.cli"));
const frontspec_cli_1 = __importDefault(require("./frontspec.cli"));
exports.default = () => {
    scss_cli_1.default();
    js_cli_1.default();
    frontspec_cli_1.default();
};
