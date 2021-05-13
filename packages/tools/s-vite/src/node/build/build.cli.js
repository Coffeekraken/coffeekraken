import __SProcess from '@coffeekraken/s-process';
import __SVite from '../SVite';
import __SViteBuildInterface from './interface/SViteBuildInterface';
export default function build(stringArgs = '') {
    const vite = new __SVite();
    const pro = __SProcess.from(vite.build.bind(vite), {
        process: {
            interface: __SViteBuildInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLHFCQUFxQixNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUscUJBQXFCO1NBQ2pDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=