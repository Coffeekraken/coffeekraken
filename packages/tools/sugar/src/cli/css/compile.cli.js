// @ts-nocheck
import SScssCompilerProcess from '../../node/scss/compile/SScssCompilerProcess';
function compileScss(stringArgs = '') {
    const pro = new SScssCompilerProcess({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
export default compileScss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxvQkFBb0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUVoRixTQUFTLFdBQVcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLG9CQUFvQixDQUNsQyxFQUFFLEVBQ0Y7UUFDRSxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIn0=