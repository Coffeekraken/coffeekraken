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
    if (stack === 'npm' && action === 'exports') {
        require('./npm/exports.cli.js').default(args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxPQUFPLEdBQ1gsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDM0MsTUFBTSxJQUFJLEdBQ1IsT0FBTyxDQUFDLElBQUk7S0FDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdkQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7S0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXJCLHVDQUF1QztBQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO0lBQ1YsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUNmO0FBRUQsMkNBQTJDO0FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDWCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0VBQWtFLEtBQUssT0FBTyxDQUMvRSxDQUFDO0tBQ0g7U0FBTTtRQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ3pCO0NBQ0Y7QUFFRCxDQUFDLEdBQVMsRUFBRTtJQUNWLElBQUksS0FBSyxLQUFLLFVBQVUsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQzdDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxPQUFPO0tBQ1I7SUFDRCxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUMzQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTztLQUNSO0lBRUQsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUUvRCxzREFBc0Q7SUFDdEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLE1BQU0sU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBRTVELG1CQUFtQjtJQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsWUFBWSxVQUFVLEVBQUU7UUFDOUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7U0FBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUN2QyxPQUFPLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO0FBQ0gsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=