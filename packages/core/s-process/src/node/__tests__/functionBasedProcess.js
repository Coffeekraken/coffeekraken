"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
function myProcess(params) {
    return new s_promise_1.default(({ resolve }) => {
        setTimeout(() => {
            resolve(Object.assign({ state: 'success', isChildProcess: childProcess_1.default() }, params));
        }, 100);
    });
}
exports.default = myProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25CYXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5jdGlvbkJhc2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFpRDtBQUNqRCw0RkFBd0U7QUFFeEUsU0FBd0IsU0FBUyxDQUFDLE1BQU07SUFDdEMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7UUFDcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE9BQU8saUJBQ0wsS0FBSyxFQUFFLFNBQVMsRUFDaEIsY0FBYyxFQUFFLHNCQUFnQixFQUFFLElBQy9CLE1BQU0sRUFDVCxDQUFDO1FBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBVkQsNEJBVUMifQ==