import __commandExists from '../commandExists';
describe('sugar.node.command.commandExists', () => {
    it('Should get the "ls" basic system command correctly', async () => {
        const res = await __commandExists('ls');
        expect(res).toBe(true);
    });
    it('Should get the return false when target a command that does not exists', async () => {
        const res = await __commandExists('lsfwefwcwefwefw');
        expect(res).toBe(false);
    });
});
