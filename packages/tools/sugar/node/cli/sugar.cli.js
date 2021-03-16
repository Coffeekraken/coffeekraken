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
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (stack === 'monorepo' && action === 'link') {
        require('./monorepo/link.cli.js').default(args);
        return;
    }
    require('../node/index');
    const __SProcess = require('../node/process/SProcess').default;
    // const pkg = require(`./${stack}/${action}.cli.js`);
    let cliApi = require(`./${stack}/${action}.cli.js`).default;
    // SProcess classes
    if (cliApi.prototype && cliApi.prototype instanceof __SProcess) {
        const processInstance = new cliApi({});
        return yield processInstance.run(args);
    }
    else if (typeof cliApi === 'function') {
        return yield cliApi(args);
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9zdWdhci5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMzQyxNQUFNLElBQUksR0FDUixPQUFPLENBQUMsSUFBSTtLQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNYLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN2RCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7S0FDbkI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztLQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFckIsdUNBQXVDO0FBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUU7SUFDVixLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ2Y7QUFFRCwyQ0FBMkM7QUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNYLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYixrRUFBa0UsS0FBSyxPQUFPLENBQy9FLENBQUM7S0FDSDtTQUFNO1FBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDekI7Q0FDRjtBQUVELENBQUMsR0FBUyxFQUFFO0lBQ1YsSUFBSSxLQUFLLEtBQUssVUFBVSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDN0MsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELE9BQU87S0FDUjtJQUVELE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFL0Qsc0RBQXNEO0lBQ3RELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUU1RCxtQkFBbUI7SUFDbkIsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLFlBQVksVUFBVSxFQUFFO1FBQzlELE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sTUFBTSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDdkMsT0FBTyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtBQUNILENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9