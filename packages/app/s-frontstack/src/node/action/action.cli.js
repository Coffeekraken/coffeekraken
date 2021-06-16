import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackActionInterface from './interface/SFrontstackActionInterface';
export default function action(stringArgs = '') {
    const frontstack = new __SFrontstack();
    const pro = __SProcess.from(frontstack.action.bind(frontstack), {
        process: {
            interface: __SFrontstackActionInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjdGlvbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRixNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLDRCQUE0QjtTQUN4QztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9