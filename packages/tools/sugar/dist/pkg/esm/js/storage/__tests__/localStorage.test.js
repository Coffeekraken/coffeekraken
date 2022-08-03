import __localStorage from '../localStorage';
describe('sugar.js.storage.localStorage', () => {
    it('Should store a small data correctly', () => {
        const value = 'a'.repeat(300);
        __localStorage.setItem('something', value);
        expect(__localStorage.getItem('something')).toBe(value);
    });
    // it('Should store a medium data correctly', () => {
    //     const value = 'a'.repeat(1500000);
    //     __localStorage.setItem('something', value);
    //     expect(__localStorage.getItem('something')).toBe(value);
    // });
    // it('Should store a large data correctly', () => {
    //     const value = 'a'.repeat(11500000);
    //     __localStorage.setItem('something', value);
    //     expect(__localStorage.getItem('something')).toBe(value);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDM0MsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtRQUMzQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ0gscURBQXFEO0lBQ3JELHlDQUF5QztJQUN6QyxrREFBa0Q7SUFDbEQsK0RBQStEO0lBQy9ELE1BQU07SUFDTixvREFBb0Q7SUFDcEQsMENBQTBDO0lBQzFDLGtEQUFrRDtJQUNsRCwrREFBK0Q7SUFDL0QsTUFBTTtBQUNWLENBQUMsQ0FBQyxDQUFDIn0=