import __fileName from '../filename.js';
describe('sugar.node.fs.filename', () => {
    it('Should get the filename from a simple file name', () => {
        expect(__fileName('hello/plop.txt')).toBe('plop.txt');
    });
    it('Should get the filename without extension from a simple file name', () => {
        expect(__fileName('hello/plop.txt', false)).toBe('plop');
    });
    it('Should get the filename from a more complex file name', () => {
        expect(__fileName('hello/plop.something.txt')).toBe('plop.something.txt');
    });
    it('Should get the filename withouth extension from a more complex file name', () => {
        expect(__fileName('hello/plop.something.txt', false)).toBe('plop.something');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsdURBQXVELEVBQUUsR0FBRyxFQUFFO1FBQzdELE1BQU0sQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0Msb0JBQW9CLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywwRUFBMEUsRUFBRSxHQUFHLEVBQUU7UUFDaEYsTUFBTSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdEQsZ0JBQWdCLENBQ25CLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=