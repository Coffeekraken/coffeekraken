import __listNodeModulesPackages from '../listNodeModulesPackages';
describe('sugar.node.npm.utils.listNodeModulesPackages', () => {
    it('Should list the sugar node_modules packages correctly', (done) => {
        const modules = __listNodeModulesPackages({
            monorepo: true
        });
        expect(Object.keys(modules).length).toBeGreaterThan(0);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdE5vZGVNb2R1bGVzUGFja2FnZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3ROb2RlTW9kdWxlc1BhY2thZ2VzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyx5QkFBeUIsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRSxRQUFRLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzVELEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25FLE1BQU0sT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9