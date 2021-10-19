import __SColor from '../SColor';
describe('s-color.shared', () => {
    it('Should parse and return the same color when passing hexa value in', () => {
        const color = new __SColor('#ff00ff');
        expect(color.toString()).toBe('#FF00FF');
    });
    it('Should parse and return the same color when passing hsl value in', () => {
        const color = new __SColor('hsl(257,25,50)');
        expect(color.toString()).toBe('#72609F');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29sb3IudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFFakMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM1QixFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsa0VBQWtFLEVBQUUsR0FBRyxFQUFFO1FBQ3hFLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=