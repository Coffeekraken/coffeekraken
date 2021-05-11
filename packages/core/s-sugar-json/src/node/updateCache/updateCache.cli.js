"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require = require('esm')(module, {});
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SSugarJsonUpdateCacheParamsInterface_1 = __importDefault(require("./interface/SSugarJsonUpdateCacheParamsInterface"));
const SSugarJson_1 = __importDefault(require("../SSugarJson"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
function start(stringArgs = '') {
    const pro = s_process_1.default.from((params = {}) => {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            emit('log', {
                value: '<yellow>[cache]</yellow> Starting cache update'
            });
            const duration = new s_duration_1.default();
            const sugarJson = new SSugarJson_1.default();
            sugarJson.updateCache();
            emit('log', {
                value: `<green>[cache]</green> Cache updated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
            resolve();
        }, {
            metas: {
                id: 'json.updateCache'
            }
        });
    }, {
        process: {
            interface: SSugarJsonUpdateCacheParamsInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FjaGUuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlQ2FjaGUuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFckMsd0VBQWlEO0FBQ2pELDRIQUFzRztBQUN0RywrREFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUduRCxTQUF3QixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxHQUFHLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQ3pCLENBQUMsU0FBYyxFQUFFLEVBQUUsRUFBRTtRQUNuQixPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxnREFBZ0Q7YUFDeEQsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7WUFDckMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLCtFQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDakIsV0FBVzthQUNaLENBQUMsQ0FBQztZQUNILE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUNEO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxrQkFBa0I7YUFDdkI7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDLEVBQ0Q7UUFDRSxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsOENBQXNDO1NBQ2xEO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBaENELHdCQWdDQyJ9