// @ts-nocheck
import __SProcess from '@coffeekraken/s-process';
import __SFrontspec from './SFrontspec';
import __SFrontspecFindParamsInterface from './interface/SFrontspecFindParamsInterface';
export default (stringArgs = '') => {
    const frontspec = new __SFrontspec();
    const pro = __SProcess.from(frontspec.find.bind(frontspec), {
        process: {
            interface: __SFrontspecFindParamsInterface
        }
    });
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sK0JBQStCLE1BQU0sMkNBQTJDLENBQUM7QUFFeEYsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDMUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLCtCQUErQjtTQUMzQztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=