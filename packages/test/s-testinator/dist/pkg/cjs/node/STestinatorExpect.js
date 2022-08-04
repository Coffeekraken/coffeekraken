"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class STestinatorExpect {
    constructor(value) {
        this.value = value;
    }
    toBe(expectedValue) {
        this.value !== expectedValue && this._throw(expectedValue);
        return this;
    }
    _throw(expected, message) {
        let finalMessage = message !== null && message !== void 0 ? message : `Expected ${this.value} to be ${expected}`;
        throw new Error(finalMessage);
    }
}
exports.default = STestinatorExpect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBcUIsaUJBQWlCO0lBR2xDLFlBQVksS0FBVTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLGFBQWtCO1FBQ25CLElBQUksQ0FBQyxLQUFLLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFhLEVBQUUsT0FBZ0I7UUFDbEMsSUFBSSxZQUFZLEdBQ1osT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksWUFBWSxJQUFJLENBQUMsS0FBSyxVQUFVLFFBQVEsRUFBRSxDQUFDO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBakJELG9DQWlCQyJ9