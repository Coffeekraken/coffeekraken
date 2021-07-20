import __SMarkdownParser from '../SMarkdownParser';
import __fs from 'fs';

describe('@coffeekraken.s-markdown-parser.SMarkdownParser', () => {

    it('Should parse correctly a simple markdown', (done) => {

        const parser = new __SMarkdownParser();

        const markdownStr = __fs.readFileSync(`${__dirname}/__data__/simple.md`, 'utf8').toString();

        parser.parse(markdownStr);


        done();
    })

});