import __SPromise from '@coffeekraken/s-promise';
import { __isChildProcess } from '@coffeekraken/sugar/is';
export default function myProcess(params) {
    return new __SPromise(({ resolve }) => {
        setTimeout(() => {
            resolve(Object.assign({ state: 'success', isChildProcess: __isChildProcess() }, params));
        }, 100);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLE1BQU07SUFDcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxpQkFDSCxLQUFLLEVBQUUsU0FBUyxFQUNoQixjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsSUFDL0IsTUFBTSxFQUNYLENBQUM7UUFDUCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==