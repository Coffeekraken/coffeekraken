"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'concat',
    args: {},
    helper: function concat({ settings }) {
        var result = '';
        for (var i in arguments) {
            result += (typeof arguments[i] === 'string' ? arguments[i] : '') + ' ';
        }
        return result;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uY2F0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsUUFBUTtJQUNaLElBQUksRUFBRSxFQUFFO0lBQ1IsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFO1FBQ2xDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixLQUFLLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUN2QixNQUFNLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3hFO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUMifQ==