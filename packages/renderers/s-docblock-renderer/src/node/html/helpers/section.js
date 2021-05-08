"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'section',
    args: {
        title: null,
        description: null
    },
    process: function classname({ title, description, settings, render }) {
        const lines = [];
        if (title) {
            // @ts-ignore
            lines.push(`<h2 class="{{ classname 'db-h2' }}">${title}</h2>`);
        }
        return render(lines.join('\n'));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLElBQUk7UUFDWCxXQUFXLEVBQUUsSUFBSTtLQUNsQjtJQUNELE9BQU8sRUFBRSxTQUFTLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtRQUNsRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxLQUFLLEVBQUU7WUFDVCxhQUFhO1lBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsS0FBSyxPQUFPLENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQyJ9