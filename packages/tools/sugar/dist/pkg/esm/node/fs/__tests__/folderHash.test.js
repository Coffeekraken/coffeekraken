import __folderHash from '../folderHash';
describe('sugar.node.fs.folderHash', () => {
    it('Should hash correctly a simple folder', () => {
        const hash = __folderHash(`${__dirname}/data/hashfolder`);
        expect(hash).toBe('0d0cd3c0b84f67987abe33d70abd054d4c30243f28ca7917583e74ebcc29f428');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLEdBQUcsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2Isa0VBQWtFLENBQ3JFLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=