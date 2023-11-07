export default function ({ root }) {
    root.walkAtRules((atRule) => {
        if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
            if (atRule.params.match(/^url\(('|")?https?:\/\//)) {
                atRule._fontImportMoved = true;
                root.nodes.unshift(atRule.clone());
                atRule.remove();
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUU7SUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3hCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==