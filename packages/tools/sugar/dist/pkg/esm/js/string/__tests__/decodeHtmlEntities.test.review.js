/**
 * @jest-environment jsdom
 */
import __decodeHtmlEntities from '../decodeHtmlEntities.js';
describe('sugar.js.html.decodeHtmlEntities', () => {
    it('Should process the passed string correctly', (done) => {
        expect(__decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;')).toBe('olivier.bossel@gmail.com');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RELE1BQU0sQ0FDRixvQkFBb0IsQ0FDaEIsa0pBQWtKLENBQ3JKLENBQ0osQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUVuQyxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==