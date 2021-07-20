import __SMarkdownParser from '../SMarkdownParser';
import __fs from 'fs';
describe('@coffeekraken.s-markdown-parser.SMarkdownParser', () => {
    it('Should parse correctly a simple markdown', (done) => {
        const parser = new __SMarkdownParser();
        const markdownStr = __fs.readFileSync(`${__dirname}/__data__/simple.md`, 'utf8').toString();
        parser.parse(markdownStr);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duUGFyc2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTWFya2Rvd25QYXJzZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixRQUFRLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO0lBRTdELEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBRXBELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUV2QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1RixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRzFCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDLENBQUMsQ0FBQyJ9