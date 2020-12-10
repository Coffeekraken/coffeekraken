"use strict";
// @ts-nocheck
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
const parseHtml_1 = __importDefault(require("../../node/terminal/parseHtml"));
const fkill_1 = __importDefault(require("fkill"));
const ps_list_1 = __importDefault(require("ps-list"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    if (!stringArgs) {
        throw new Error(`You must specify a sugar process(s) to kill using the following format:
      - sugar util.kill server // this will kill all the sugar processes that starts with "server"
      - sugar util.kill server.frontend // this will kill the sugar process called "server.frontend"
      - sugar util.kill all // this will kill all the sugar processes
    `);
    }
    else if (stringArgs.trim() === 'all') {
        stringArgs = '';
    }
    const processesArray = [];
    console.log(parseHtml_1.default(`Listing all the processes that need to be killed...`));
    let processesObj;
    try {
        processesObj = yield ps_list_1.default();
    }
    catch (e) {
    }
    if (!processesObj) {
        console.log(parseHtml_1.default('No processes to kill...'));
        process.exit();
    }
    Object.keys(processesObj).forEach((key) => {
        const processObj = processesObj[key];
        if (processObj.pid === process.pid || processObj.pid === process.ppid) {
            return;
        }
        if (processObj.name !== 'node')
            return;
        if (processObj.cmd.includes('/bin/sh -c ps -e|grep') ||
            processObj.cmd.includes('grep sugar ') ||
            processObj.cmd.includes('sugar util.kill '))
            return;
        let filterReg = new RegExp(`^(.*)?sugar\\s${stringArgs.split('.').join('\\.')}(.*?)$`, 'gi');
        if (!processObj.cmd.match(filterReg))
            return;
        processesArray.push(processObj);
    });
    if (processesArray.length === 0) {
        console.log(parseHtml_1.default(`<green>Theirs's no process to kill...</green>`));
        process.exit();
    }
    console.log(parseHtml_1.default(`Process(es) to kill: <primary>${processesArray.length}</primary>`));
    for (let obj in processesArray) {
        const processObj = processesArray[obj];
        console.log(parseHtml_1.default(`Killing the process <primary>${processObj.cmd}</primary> with the PID <cyan>${processObj.pid}</cyan>`));
        yield fkill_1.default(parseInt(processObj.pid), {
            force: true
            // silent: true
        });
    }
    console.log(parseHtml_1.default(`<primary>${processesArray.length}</primary> process(es) have been killed <green>successfully</green>`));
    process.exit();
});
//# sourceMappingURL=module.js.map