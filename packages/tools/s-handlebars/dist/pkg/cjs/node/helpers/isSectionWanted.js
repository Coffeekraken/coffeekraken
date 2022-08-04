"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const markdownConfig = s_sugar_config_1.default.get('markdownBuilder');
function isSectionWanted(conditional, options) {
    // @ts-ignore
    let sections = this.sections;
    // @ts-ignore
    if (!this.sections) {
        sections = Object.keys(markdownConfig.sections);
    }
    else {
        // @ts-ignore
        sections = this.sections.split(',').map((l) => l.trim());
    }
    if (sections.indexOf(conditional) !== -1) {
        // @ts-ignore
        return options.fn(this);
    }
    else {
        // @ts-ignore
        return options.inverse(this);
    }
}
exports.default = isSectionWanted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTBEO0FBRTFELE1BQU0sY0FBYyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFN0QsU0FBd0IsZUFBZSxDQUFDLFdBQVcsRUFBRSxPQUFPO0lBQ3hELGFBQWE7SUFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzdCLGFBQWE7SUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNoQixRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILGFBQWE7UUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM1RDtJQUVELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN0QyxhQUFhO1FBQ2IsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDSCxhQUFhO1FBQ2IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQztBQWxCRCxrQ0FrQkMifQ==