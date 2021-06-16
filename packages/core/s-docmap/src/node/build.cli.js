// @ts-nocheck
import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapBuildParamsInterface from './interface/SDocMapBuildParamsInterface';
export default (stringArgs = '') => {
    const docmap = new __SDocMap();
    const pro = __SProcess.from(docmap.build.bind(docmap), {
        process: {
            interface: __SDocMapBuildParamsInterface
        }
    });
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVwRixlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFDL0IsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsNkJBQTZCO1NBQ3pDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMifQ==