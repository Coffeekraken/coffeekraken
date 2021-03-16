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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvZG9jYmxvY2svcmVuZGVyZXJzL2h0bWwvaGVscGVycy9jbGFzc25hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxXQUFXO0lBQ2YsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELE1BQU0sRUFBRSxTQUFTLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7UUFDOUMsSUFDRSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ2YsT0FBTyxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDbEMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO1lBRXJCLE9BQU8sT0FBTyxDQUFDO1FBRWpCLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTzthQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ1osR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWCxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFYixPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFDIn0=