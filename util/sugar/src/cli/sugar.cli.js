#!/usr/bin/env node

/**
 * @name            sugar.cli
 * @namespace       sugar.cli
 * @type            File
 * 
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const command = process.argv[2].split(' ')[0];
const stack = command.split('.')[0];
const action = command.split('.')[1] || null;
const args = process.argv.slice(3).join(' ') || '';

require(`./${stack}/${action}.cli.js`)(args);