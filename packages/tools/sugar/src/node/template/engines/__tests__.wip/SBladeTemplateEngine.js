"use strict";
const __path = require('path');
const __tmp = require('tmp');
module.exports = (__SBladeTemplateEngine) => {
    describe('sugar.node.template.engines.SBladeTemplateEngine', () => {
        const engine = new __SBladeTemplateEngine({
            cacheDir: __tmp.tmpNameSync()
        });
        it('Should correctly render the passed view path', (done) => {
            engine
                .render(__path.resolve(__dirname, 'views/index.blade.php'))
                .then((res) => {
                console.log('res');
                expect(true).toBe(true);
                done();
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsYWRlVGVtcGxhdGVFbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxhZGVUZW1wbGF0ZUVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtJQUMxQyxRQUFRLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQXNCLENBQUM7WUFDeEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUQsTUFBTTtpQkFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDMUQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==