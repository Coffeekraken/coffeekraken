require = require('esm')(module, {});
import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonUpdateCacheParamsInterface from './interface/SSugarJsonUpdateCacheParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
export default function start(stringArgs = '') {
    const pro = __SProcess.from((params = {}) => {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FjaGUuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlQ2FjaGUuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXJDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sc0NBQXNDLE1BQU0sa0RBQWtELENBQUM7QUFDdEcsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBR25ELE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQ3pCLENBQUMsU0FBYyxFQUFFLEVBQUUsRUFBRTtRQUNuQixPQUFPLElBQUksVUFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGdEQUFnRDthQUN4RCxDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDckMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLCtFQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDakIsV0FBVzthQUNaLENBQUMsQ0FBQztZQUNILE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUNEO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxrQkFBa0I7YUFDdkI7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDLEVBQ0Q7UUFDRSxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsc0NBQXNDO1NBQ2xEO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=