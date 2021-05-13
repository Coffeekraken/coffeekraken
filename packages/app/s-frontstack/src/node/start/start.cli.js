import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackStartInterface from './interface/SFrontstackStartInterface';
export default function start(stringArgs = '') {
    const frontstack = new __SFrontstack();
    const pro = __SProcess.from(frontstack.start.bind(frontstack), {
        process: {
            interface: __SFrontstackStartInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhcnQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdELE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSwyQkFBMkI7U0FDdkM7S0FDRixDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==