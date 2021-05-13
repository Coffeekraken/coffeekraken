import __SProcess from '@coffeekraken/s-process';
import __SSvelteCompiler from './SSvelteCompiler';
import __SSvelteCompilerInterface from './interface/SSvelteCompilerInterface';
export default function start(stringArgs = '') {
    const compiler = new __SSvelteCompiler();
    const pro = __SProcess.from(compiler._compile.bind(compiler), {
        process: {
            interface: __SSvelteCompilerInterface
        }
    });
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFFOUUsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUQsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLDBCQUEwQjtTQUN0QztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9