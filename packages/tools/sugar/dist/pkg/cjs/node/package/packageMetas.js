"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function __packageMetas(path = process.cwd(), settings) {
    const finalSettings = Object.assign({ sources: ['package.json', 'composer.json'], fields: ['name', 'description', 'version', 'author', 'license'] }, (settings !== null && settings !== void 0 ? settings : {}));
    let foundFieldsCount = 0;
    const finalMetas = {};
    for (let source of finalSettings.sources) {
        // if we have already found everything
        // stop here
        if (foundFieldsCount >= finalSettings.fields.length) {
            break;
        }
        // if the file exist, read it and handle fields
        if (fs_1.default.existsSync(`${path}/${source}`)) {
            const json = JSON.parse(fs_1.default.readFileSync(`${path}/${source}`).toString());
            // check every fields to grab info from
            for (let field of finalSettings.fields) {
                if (!finalMetas[field] && json[field] !== undefined) {
                    finalMetas[field] = json[field];
                    foundFieldsCount++;
                }
            }
        }
    }
    // return the metas
    return finalMetas;
}
exports.default = __packageMetas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQTJDdEIsU0FBd0IsY0FBYyxDQUNsQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNwQixRQUF5QztJQUV6QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxFQUMxQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLElBQzVELENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUV6QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFdEIsS0FBSyxJQUFJLE1BQU0sSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO1FBQ3RDLHNDQUFzQztRQUN0QyxZQUFZO1FBQ1osSUFBSSxnQkFBZ0IsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqRCxNQUFNO1NBQ1Q7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDbkIsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNwRCxDQUFDO1lBRUYsdUNBQXVDO1lBQ3ZDLEtBQUssSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNqRCxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7S0FDSjtJQUVELG1CQUFtQjtJQUNuQixPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBdkNELGlDQXVDQyJ9