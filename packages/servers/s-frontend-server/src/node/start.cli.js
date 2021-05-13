import __SProcess from '@coffeekraken/s-process';
import __SFrontendServer from './SFrontendServer';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
export default function start(stringArgs = '') {
    const server = new __SFrontendServer();
    const pro = __SProcess.from(server.start.bind(server), {
        process: {
            interface: __SFrontendServerInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhcnQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFDdkMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsMEJBQTBCO1NBQ3RDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=