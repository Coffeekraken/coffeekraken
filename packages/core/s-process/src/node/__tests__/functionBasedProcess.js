import __SPromise from '@coffeekraken/s-promise';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
export default function myProcess(params) {
    return new __SPromise(({ resolve }) => {
        setTimeout(() => {
            resolve(Object.assign({ state: 'success', isChildProcess: __isChildProcess() }, params));
        }, 100);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25CYXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5jdGlvbkJhc2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBRXhFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLE1BQU07SUFDcEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxpQkFDSCxLQUFLLEVBQUUsU0FBUyxFQUNoQixjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsSUFDL0IsTUFBTSxFQUNYLENBQUM7UUFDUCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==