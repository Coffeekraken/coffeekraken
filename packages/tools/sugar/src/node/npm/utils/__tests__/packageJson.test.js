import __packageJson from '../packageJson';
import __packageRoot from '../../../path/packageRoot';
describe('sugar.node.npm.utils.packageJson', () => {
    it('Should fetch the "chokidar" package.json correctly', (done) => {
        const json = __packageJson('chokidar', {
            rootDir: __packageRoot(__dirname)
        });
        expect(json.name).toBe('chokidar');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VKc29uLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoRSxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9