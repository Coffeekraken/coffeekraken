import __SProcess from '@coffeekraken/s-process';
import __SJsCompiler from './SJsCompiler';
import __SJsCompilerInterface from './interface/SJsCompilerInterface';
export default function compile(stringArgs = '') {
    const compiler = new __SJsCompiler();
    const pro = __SProcess.from(compiler.compile.bind(compiler), {
        process: {
            interface: __SJsCompilerInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxzQkFBc0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDM0QsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLHNCQUFzQjtTQUNsQztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9