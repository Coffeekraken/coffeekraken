import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackRecipeParamsInterface from './interface/SFrontstackRecipeParamsInterface';
export default function action(stringArgs = '') {
    const frontstack = new __SFrontstack();
    const pro = __SProcess.from(frontstack.recipe.bind(frontstack), {
        process: {
            interface: __SFrontstackRecipeParamsInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXBlLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlY2lwZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxrQ0FBa0MsTUFBTSw4Q0FBOEMsQ0FBQztBQUU5RixNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLGtDQUFrQztTQUM5QztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9