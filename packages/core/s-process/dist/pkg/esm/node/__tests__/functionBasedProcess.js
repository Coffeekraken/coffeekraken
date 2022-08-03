import __SPromise from '@coffeekraken/s-promise';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
export default function myProcess(params) {
    return new __SPromise(({ resolve }) => {
        setTimeout(() => {
            resolve(Object.assign({ state: 'success', isChildProcess: __isChildProcess() }, params));
        }, 100);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sMENBQTBDLENBQUM7QUFFeEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsTUFBTTtJQUNwQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLGlCQUNILEtBQUssRUFBRSxTQUFTLEVBQ2hCLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxJQUMvQixNQUFNLEVBQ1gsQ0FBQztRQUNQLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9