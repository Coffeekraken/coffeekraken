import __fs from 'fs';
import { format } from 'prettier';
describe('prettier-plugin-riotjs', () => {
    it('Should format a simple file correctly', (done) => {
        const code = __fs.readFileSync(`${__dirname}/samples/default/test.riot`, 'utf8');
        const actualOutput = format(code, {
            parser: 'riot',
            plugins: [`${__dirname}/../../`],
            tabWidth: 4
            //   ...options
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25ELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQzVCLEdBQUcsU0FBUyw0QkFBNEIsRUFDeEMsTUFBTSxDQUNQLENBQUM7UUFDRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxNQUFhO1lBQ3JCLE9BQU8sRUFBRSxDQUFDLEdBQUcsU0FBUyxTQUFTLENBQUM7WUFDaEMsUUFBUSxFQUFFLENBQUM7WUFDWCxlQUFlO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9