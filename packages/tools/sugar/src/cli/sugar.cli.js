#!/usr/bin/env node --trace-warnings --trace-uncaught
"use strict";
// @ts-nocheck
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
let fn = require(`./${stack}/${action}.cli.js`);
if (fn.default)
    fn = fn.default;
fn(args);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsY0FBYztBQUVkLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QixnRUFBZ0U7QUFFaEU7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxPQUFPLEdBQ1gsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDM0MsTUFBTSxJQUFJLEdBQ1IsT0FBTyxDQUFDLElBQUk7S0FDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdkQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7S0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXJCLHVDQUF1QztBQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO0lBQ1YsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUNmO0FBRUQsMkNBQTJDO0FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDWCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0VBQWtFLEtBQUssT0FBTyxDQUMvRSxDQUFDO0tBQ0g7U0FBTTtRQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ3pCO0NBQ0Y7QUFFRCxzREFBc0Q7QUFDdEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLE1BQU0sU0FBUyxDQUFDLENBQUM7QUFDaEQsSUFBSSxFQUFFLENBQUMsT0FBTztJQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ2hDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9