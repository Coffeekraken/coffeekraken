import __stripTags from '../striptags.js';

describe('sugar.shared.html.striptags', () => {
    const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;

    const res = __stripTags(html, '<bold>');

    it('Should have replace the tags correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>How are you?');
    });
});
