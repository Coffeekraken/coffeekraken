#!/usr/bin/env node --trace-warnings --trace-uncaught
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../node/process/SProcess"));
require('../node/index');
// const __exitCleanup = require('../node/process/exitCleanup');
/**
 * @name            sugar.cli
 * @namespace           cli
 * @type            File
 *
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 *
 * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const command = process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
let stack = command.split('.')[0];
let action = command.split('.')[1] || null;
const args = process.argv
    .slice(3)
    .map((arg) => {
    if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
    }
    return arg;
})
    .join(' ') || '';
// if theirs nothing as stack or action
if (!stack) {
    stack = 'app';
}
// if no action, try to get the default one
if (!action) {
    const config = require(`./${stack}/config.json`);
    if (!config.default) {
        throw new Error(`Sorry but you have to specify an action to make on the module "${stack}}"...`);
    }
    else {
        action = config.default;
    }
}
// const pkg = require(`./${stack}/${action}.cli.js`);
let cliApi = require(`./${stack}/${action}.cli.js`).default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // SProcess classes
    if (cliApi.prototype && cliApi.prototype instanceof SProcess_1.default) {
        const processInstance = new cliApi({});
        return yield processInstance.run(args);
    }
    else if (typeof cliApi === 'function') {
        return yield cliApi(args);
    }
}))();
// if (fn.default) fn = fn.default;
// fn(args);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdFQUFrRDtBQUVsRCxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsZ0VBQWdFO0FBRWhFOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxHQUNYLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzNDLE1BQU0sSUFBSSxHQUNSLE9BQU8sQ0FBQyxJQUFJO0tBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1gsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3ZELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVyQix1Q0FBdUM7QUFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTtJQUNWLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDZjtBQUVELDJDQUEyQztBQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ1gsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNuQixNQUFNLElBQUksS0FBSyxDQUNiLGtFQUFrRSxLQUFLLE9BQU8sQ0FDL0UsQ0FBQztLQUNIO1NBQU07UUFDTCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUN6QjtDQUNGO0FBRUQsc0RBQXNEO0FBQ3RELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU1RCxDQUFDLEdBQVMsRUFBRTtJQUNWLG1CQUFtQjtJQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsWUFBWSxrQkFBVSxFQUFFO1FBQzlELE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sTUFBTSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDdkMsT0FBTyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtBQUNILENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUVMLG1DQUFtQztBQUNuQyxZQUFZIn0=