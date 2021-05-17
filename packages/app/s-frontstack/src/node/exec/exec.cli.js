import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackExecInterface from './interface/SFrontstackExecInterface';
export default function start(stringArgs = '') {
    const frontstack = new __SFrontstack();
    const pro = __SProcess.from(frontstack.exec.bind(frontstack), {
        process: {
            interface: __SFrontstackExecInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGVjLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLDBCQUEwQixNQUFNLHNDQUFzQyxDQUFDO0FBRTlFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFDdkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsMEJBQTBCO1NBQ3RDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=