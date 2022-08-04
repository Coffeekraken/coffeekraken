export default function ({ root }) {
    root.walkAtRules((atRule) => {
        if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
            if (atRule.params.match(/^url\(('|")?https?:\/\//)) {
                atRule._fontImportMoved = true;
                atRule.remove();
                root.nodes.unshift(atRule);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUU7SUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3hCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==