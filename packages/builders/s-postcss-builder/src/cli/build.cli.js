import __SProcess from '@coffeekraken/s-process';
import __SPostcssBuilderBuildParamsInterface from '../node/interface/SPostcssBuilderBuildParamsInterface';
import __SPostcssBuilder from '../node/SPostcssBuilder';
export default function build(stringArgs = '') {
    const builder = new __SPostcssBuilder();
    const pro = __SProcess.from(builder.build.bind(builder), {
        process: {
            interface: __SPostcssBuilderBuildParamsInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8scUNBQXFDLE1BQU0sdURBQXVELENBQUM7QUFDMUcsT0FBTyxpQkFBaUIsTUFBTSx5QkFBeUIsQ0FBQztBQUd4RCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUV6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzdCO1FBQ0UsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLHFDQUFxQztTQUNqRDtLQUNKLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEIsQ0FBQyJ9