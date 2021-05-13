import __SProcess from '@coffeekraken/s-process';
import __STsCompiler from './STsCompiler';
import __STsCompilerInterface from './interface/STsCompilerInterface';
export default function start(stringArgs = '') {
    const compiler = new __STsCompiler();
    const pro = __SProcess.from(compiler._compile.bind(compiler), {
        process: {
            interface: __STsCompilerInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxzQkFBc0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLHNCQUFzQjtTQUNsQztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9