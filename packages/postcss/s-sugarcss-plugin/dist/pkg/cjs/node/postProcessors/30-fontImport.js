"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEVBQUUsSUFBSSxFQUFFO0lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQzFELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNuQjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsNEJBVUMifQ==