import __SViewRenderer from '../SViewRenderer';
export default function page404(data) {
    const engine = new __SViewRenderer('pages.error.404', {
        view: {
            engine: 'blade'
        }
    });
    console.log('DFA', data);
    const result = engine.render(data);
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBK0MsTUFBTSxrQkFBa0IsQ0FBQztBQTZCL0UsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzdCLElBQWM7SUFFZCxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRTtRQUNwRCxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsT0FBTztTQUNoQjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9