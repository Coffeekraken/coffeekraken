"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ root }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUJBQXlCLEVBQUUsSUFBSSxFQUFFO0lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQzFELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsNEJBVUMifQ==