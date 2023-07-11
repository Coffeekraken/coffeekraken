import __copy from '../copy.js';
import __read from '../read.js';
describe('sugar.node.clipboad', () => {
    it('Should copy and paste a text value correctly', async () => {
        const text = 'hello world';
        __copy(text);
        expect(text).toBe(__read());
    });
});
