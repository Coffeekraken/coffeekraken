import __findUp from '../findUp.js';
describe('sugar.node.fs.findUp', () => {
    it('Should find a simple file upward correctly', async () => {
        const res = await __findUp('file.jpg', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
    });
    it('Should find some files upward using glob correctly', async () => {
        const res = await __findUp('file.*', {
            cwd: `${__dirname}/data/subfolder`,
        });
        expect(res.length).toBe(3);
    });
});
