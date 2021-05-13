// @ts-nocheck
import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapParamsInterface from './interface/SDocMapFindParamsInterface';
export default (stringArgs = '') => {
    const docmap = new __SDocMap();
    const pro = __SProcess.from(docmap.read.bind(docmap), {
        process: {
            interface: __SDocMapParamsInterface
        }
    });
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sd0JBQXdCLE1BQU0sd0NBQXdDLENBQUM7QUFFOUUsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQy9CLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLHdCQUF3QjtTQUNwQztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=