import __SProcess from '@coffeekraken/s-process';
import __SPostcssCompiler from './SPostcssCompiler';
import __SPostcssCompilerInterface from './interface/SPostcssCompilerInterface';
export default function start(stringArgs = '') {
    const compiler = new __SPostcssCompiler();
    const pro = __SProcess.from(compiler.compile.bind(compiler), {
        process: {
            interface: __SPostcssCompilerInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0lBQzFDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDM0QsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLDJCQUEyQjtTQUN2QztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9