"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'section',
    args: {
        title: null,
        description: null
    },
    helper: function classname({ title, description, settings, render }) {
        const lines = [];
        if (title) {
            lines.push(`<h2 class="{{ classname 'db-h2' }}">${title}</h2>`);
        }
        return render(lines.join('\n'));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLElBQUk7UUFDWCxXQUFXLEVBQUUsSUFBSTtLQUNsQjtJQUNELE1BQU0sRUFBRSxTQUFTLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtRQUNqRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFDIn0=