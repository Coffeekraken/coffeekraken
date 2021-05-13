import __SViewRenderer from '../SViewRenderer';
export default function page404(data) {
    const engine = new __SViewRenderer('pages.404', {
        view: {
            engine: 'blade'
        }
    });
    const result = engine.render(data);
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBK0MsTUFBTSxrQkFBa0IsQ0FBQztBQTZCL0UsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzdCLElBQWM7SUFFZCxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUU7UUFDOUMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLE9BQU87U0FDaEI7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==