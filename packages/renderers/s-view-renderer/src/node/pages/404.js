import __SViewRenderer from '../SViewRenderer';
export default function page404(data) {
    const engine = new __SViewRenderer('pages.error.404', {
        viewRenderer: {},
    });
    const result = engine.render(data);
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sZUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBNkIvQyxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDM0IsSUFBYztJQUVkLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGlCQUFpQixFQUFFO1FBQ2xELFlBQVksRUFBRSxFQUFFO0tBQ25CLENBQUMsQ0FBQztJQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9