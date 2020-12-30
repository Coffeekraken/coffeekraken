"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SConfigFsAdapter_1 = __importDefault(require("../adapters/SConfigFsAdapter"));
const SConfig_1 = __importDefault(require("../SConfig"));
require('./SConfigFsAdapter')(SConfig_1.default, SConfigFsAdapter_1.default);
//# sourceMappingURL=SConfigFsAdapter.test.js.map