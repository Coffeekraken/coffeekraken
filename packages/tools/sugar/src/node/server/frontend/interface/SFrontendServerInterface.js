"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SFrontendServerInterface
 * @namespace           sugar.node.server.express.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontendServerInterface extends SInterface_1.default {
}
exports.default = SFrontendServerInterface;
SFrontendServerInterface.definitionObj = {
    hostname: {
        type: 'String',
        alias: 'o',
        description: 'Server hostname',
        default: sugar_1.default('frontend.hostname') || '127.0.0.1',
        level: 1
    },
    port: {
        type: 'Number',
        alias: 'p',
        description: 'Server port',
        default: sugar_1.default('frontend.port') || 3000,
        level: 1
    },
    rootDir: {
        type: 'String',
        description: 'Server root directory',
        default: sugar_1.default('frontend.rootDir') || __packageRoot(process.cwd()),
        level: 1
    },
    viewsDir: {
        type: 'String',
        description: 'Server views directory',
        default: sugar_1.default('frontend.viewsDir') ||
            __packageRoot(process.cwd()) + '/views'
    }
};
