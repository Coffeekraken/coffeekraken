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
            // @ts-ignore
            lines.push(`<h2 class="{{ classname 'db-h2' }}">${title}</h2>`);
        }
        return render(lines.join('\n'));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL2RvY2Jsb2NrL3JlbmRlcmVycy9odG1sL2hlbHBlcnMvc2VjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFNBQVM7SUFDYixJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsSUFBSTtRQUNYLFdBQVcsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsTUFBTSxFQUFFLFNBQVMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLEtBQUssRUFBRTtZQUNULGFBQWE7WUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFDIn0=