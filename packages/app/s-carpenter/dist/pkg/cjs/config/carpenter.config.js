"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        server: {
            port: 3001,
        },
        sources: {
            components: {
                title: 'Components',
                specsNamespaces: ['components'],
            },
            sections: {
                title: 'Sections',
                specsNamespaces: ['sections'],
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLFVBQVUsRUFBRTtnQkFDUixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsZUFBZSxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ2xDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxVQUFVO2dCQUNqQixlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDaEM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBakJELDRCQWlCQyJ9