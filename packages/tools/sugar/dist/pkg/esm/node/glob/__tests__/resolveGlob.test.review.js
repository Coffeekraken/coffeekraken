import __resolveGlob from '../resolveGlob';
describe('sugar.node.glob.resolveGlob', () => {
    it('Should resolve the passed glob correctly', (done) => {
        const files = __resolveGlob(`data/**/*`, {
            cwd: __dirname,
        });
        const file = files[0];
        expect(file.path.includes('src/node/glob/__tests__/data/myCoolData.txt')).toBe(true);
        expect(file.cwd.includes('src/node/glob/__tests__')).toBe(true);
        expect(file.relPath).toBe('data/myCoolData.txt');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDZDQUE2QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNqRCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==