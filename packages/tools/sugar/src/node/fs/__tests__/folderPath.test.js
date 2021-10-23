import __folderPath from '../folderPath';
describe('sugar.node.fs.folderPath', () => {
    it('Should get a simple folder path correctly', () => {
        const path = __folderPath(`${__dirname}/data/file.jpg`);
        expect(path).toBe(`${__dirname}/data`);
    });
    it('Should return false when checking for a non existing folder', () => {
        const path = __folderPath(`${__dirname}/data/file111.jpg`, true);
        expect(path).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyUGF0aC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9sZGVyUGF0aC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7UUFDakQsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLEdBQUcsRUFBRTtRQUNuRSxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxTQUFTLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9