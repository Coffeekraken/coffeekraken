"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
class LogInterface extends SInterface_1.default {
}
LogInterface.definition = {
    value: {
        require: true
    }
};
module.exports = LogInterface;
