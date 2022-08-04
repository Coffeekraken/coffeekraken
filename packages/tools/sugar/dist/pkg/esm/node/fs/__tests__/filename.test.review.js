import __fileName from '../filename';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7UUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtRQUN6RSxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLEdBQUcsRUFBRTtRQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9DLG9CQUFvQixDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMEVBQTBFLEVBQUUsR0FBRyxFQUFFO1FBQ2hGLE1BQU0sQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RELGdCQUFnQixDQUNuQixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9