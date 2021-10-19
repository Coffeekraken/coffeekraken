import __decodeHtmlEntities from '../decodeHtmlEntities';
describe('sugar.js.html.decodeHtmlEntities', () => {
    it('Should process the passed string correctly', (done) => {
        expect(__decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;')).toBe('olivier.bossel@gmail.com');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlSHRtbEVudGl0aWVzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWNvZGVIdG1sRW50aXRpZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDdEQsTUFBTSxDQUNGLG9CQUFvQixDQUNoQixrSkFBa0osQ0FDckosQ0FDSixDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRW5DLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9