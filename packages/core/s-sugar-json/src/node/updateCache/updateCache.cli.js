var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonUpdateCacheParamsInterface from './interface/SSugarJsonUpdateCacheParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
export default function start(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const pro = yield __SProcess.from((params = {}) => {
            return new __SPromise(({ resolve, reject, emit }) => {
                emit('log', {
                    value: '<yellow>[cache]</yellow> Starting cache update'
                });
                const duration = new __SDuration();
                const sugarJson = new __SSugarJson();
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
                interface: __SSugarJsonUpdateCacheParamsInterface
            }
        });
        pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FjaGUuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlQ2FjaGUuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sc0NBQXNDLE1BQU0sa0RBQWtELENBQUM7QUFDdEcsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBR25ELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFDakQsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUMvQixDQUFDLFNBQWMsRUFBRSxFQUFFLEVBQUU7WUFDbkIsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsZ0RBQWdEO2lCQUN4RCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDckMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSwrRUFDTCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ2pCLFdBQVc7aUJBQ1osQ0FBQyxDQUFDO2dCQUNILE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxFQUNEO2dCQUNFLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsa0JBQWtCO2lCQUN2QjthQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsc0NBQXNDO2FBQ2xEO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQUEifQ==