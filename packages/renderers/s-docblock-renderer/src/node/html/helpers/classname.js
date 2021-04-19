"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'classname',
    args: {
        classes: ''
    },
    helper: function classname({ classes, settings }) {
        if (!settings.scope ||
            typeof settings.scope !== 'string' ||
            settings.scope === '')
            return classes;
        const processedClasses = classes
            .split(/\s+/)
            .map((cls) => {
            return `${settings.scope}${cls}`;
        })
            .join(' ');
        return processedClasses;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3NuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxNQUFNLEVBQUUsU0FBUyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO1FBQzlDLElBQ0UsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNmLE9BQU8sUUFBUSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQ2xDLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUVyQixPQUFPLE9BQU8sQ0FBQztRQUVqQixNQUFNLGdCQUFnQixHQUFHLE9BQU87YUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWIsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQyJ9