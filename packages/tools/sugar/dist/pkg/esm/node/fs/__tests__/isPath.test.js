import __isPath from '../isPath';
describe('sugar.node.fs.isPath', () => {
    it('Should detect that a valid path is a valid path', () => {
        expect(__isPath('/my/cool/path.png')).toBe(true);
    });
    it('Should detect that a simple file path is a valid path', () => {
        expect(__isPath('path.png')).toBe(true);
    });
    it('Should return true when checking for a valid path that exists', () => {
        expect(__isPath(`${__dirname}/data/file.jpg`, true)).toBe(true);
    });
    it('Should return false when checking for a valid path that does not exists', () => {
        expect(__isPath(`${__dirname}/data/file22232323.jpg`, true)).toBe(false);
    });
    it('Should detect that passing null is not a valid path', () => {
        expect(__isPath(null)).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7UUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLEdBQUcsRUFBRTtRQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLCtEQUErRCxFQUFFLEdBQUcsRUFBRTtRQUNyRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxHQUFHLEVBQUU7UUFDL0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdELEtBQUssQ0FDUixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMscURBQXFELEVBQUUsR0FBRyxFQUFFO1FBQzNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9