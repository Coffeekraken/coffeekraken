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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpL19fd2lwX18vdXRpbC9raWxsLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw4RUFBd0Q7QUFDeEQsa0RBQTRCO0FBQzVCLHNEQUE2QjtBQUc3QixrQkFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQzs7OztLQUlmLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxFQUFFO1FBQ3RDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDakI7SUFFRCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBVyxDQUFDLHFEQUFxRCxDQUFDLENBQ25FLENBQUM7SUFFRixJQUFJLFlBQVksQ0FBQztJQUNqQixJQUFJO1FBQ0YsWUFBWSxHQUFHLE1BQU0saUJBQU0sRUFBRSxDQUFDO0tBQy9CO0lBQUMsT0FBTSxDQUFDLEVBQUU7S0FDVjtJQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBVyxDQUFDLHlCQUF5QixDQUFDLENBQ3ZDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDaEI7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckUsT0FBTztTQUNSO1FBQ0QsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBQ3ZDLElBQ0UsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7WUFDaEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBRTNDLE9BQU87UUFFVCxJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FDeEIsaUJBQWlCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQzFELElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU87UUFFN0MsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBVyxDQUFDLCtDQUErQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDaEI7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFXLENBQ1QsaUNBQWlDLGNBQWMsQ0FBQyxNQUFNLFlBQVksQ0FDbkUsQ0FDRixDQUFDO0lBRUYsS0FBSyxJQUFJLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFDOUIsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQVcsQ0FDVCxnQ0FBZ0MsVUFBVSxDQUFDLEdBQUcsaUNBQWlDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FDdkcsQ0FDRixDQUFDO1FBQ0YsTUFBTSxlQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QyxLQUFLLEVBQUUsSUFBSTtZQUNYLGVBQWU7U0FDaEIsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFXLENBQ1QsWUFBWSxjQUFjLENBQUMsTUFBTSxxRUFBcUUsQ0FDdkcsQ0FDRixDQUFDO0lBRUYsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQSxDQUFDIn0=