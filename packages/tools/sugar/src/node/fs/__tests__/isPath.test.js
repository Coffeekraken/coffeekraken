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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpc1BhdGgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7UUFDN0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrREFBK0QsRUFBRSxHQUFHLEVBQUU7UUFDckUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBRyxFQUFFO1FBQy9FLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM3RCxLQUFLLENBQ1IsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtRQUMzRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==