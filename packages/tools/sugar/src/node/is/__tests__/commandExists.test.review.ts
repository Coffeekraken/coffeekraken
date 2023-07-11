import __isCommandExists from '../isCommandExists.js';
describe('sugar.node.command.isCommandExists', () => {
    it('Should get the "ls" basic system command correctly', async () => {
        const res = await __isCommandExists('ls');
        expect(res).toBe(true);
    });
    it('Should get the return false when target a command that does not exists', async () => {
        const res = await __isCommandExists('lsfwefwcwefwefw');
        expect(res).toBe(false);
    });
});
