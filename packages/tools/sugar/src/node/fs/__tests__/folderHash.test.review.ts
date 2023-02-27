import __folderHashSync from '../folderHashSync';
describe('sugar.node.fs.folderHash', () => {
    it('Should hash correctly a simple folder', () => {
        const hash = __folderHashSync(`${__dirname}/data/hashfolder`);
        expect(hash).toBe(
            '0d0cd3c0b84f67987abe33d70abd054d4c30243f28ca7917583e74ebcc29f428',
        );
    });
});
