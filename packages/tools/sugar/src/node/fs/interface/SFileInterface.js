"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SFsFileInterface extends SInterface_1.default {
    },
    _a.definition = {
        name: {
            type: 'String',
            description: 'Store the file name',
            required: true
        },
        path: {
            type: 'String',
            description: 'Store the full file path to the file on the system',
            required: true
        },
        rootDir: {
            type: 'String',
            description: 'Store the path to the root directory where lives the file. This has to be specified in the settings.rootDir property through the constructor'
        },
        relPath: {
            type: 'String',
            description: 'Store the path to the file relative to the ```rootDir``` property if this one has been setted'
        },
        dirPath: {
            type: 'String',
            description: 'Store the file path of the folder where lives the file',
            required: true
        },
        extension: {
            type: 'String',
            description: 'Store the file extension like "json", "js", "css", etc...',
            required: true
        },
        size: {
            type: 'Number',
            description: 'Store the file size in megabytes. If the file does not exist this value will be "0"',
            required: true
        },
        sizeInBytes: {
            type: 'Number',
            description: 'Same as the "size" property but in bytes',
            requried: true
        },
        exists: {
            type: 'Boolean',
            description: 'true if the file exists on the filesystem, false if not',
            required: true
        }
    },
    _a);
