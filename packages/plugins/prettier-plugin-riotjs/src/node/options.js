// @ts-nocheck
function makeChoice(choice) {
    return { value: choice, description: choice };
}
export const options = {
    svelteSortOrder: {
        since: '0.6.0',
        category: 'Svelte',
        type: 'choice',
        default: 'options-scripts-markup-styles',
        description: 'Sort order for scripts, markup, and styles',
        choices: [
            makeChoice('scripts-markup-styles'),
            makeChoice('scripts-styles-markup'),
            makeChoice('styles-markup-scripts'),
            makeChoice('styles-scripts-markup'),
            makeChoice('markup-styles-scripts'),
            makeChoice('markup-scripts-styles')
        ]
    }
};
const sortOrderSeparator = '-';
export function parseSortOrder(sortOrder) {
    const order = sortOrder.split(sortOrderSeparator);
    return order;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQVVkLFNBQVMsVUFBVSxDQUFDLE1BQWM7SUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQStDO0lBQ2pFLGVBQWUsRUFBRTtRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLFdBQVcsRUFBRSw0Q0FBNEM7UUFDekQsT0FBTyxFQUFFO1lBQ1AsVUFBVSxDQUFDLHVCQUF1QixDQUFDO1lBQ25DLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNuQyxVQUFVLENBQUMsdUJBQXVCLENBQUM7WUFDbkMsVUFBVSxDQUFDLHVCQUF1QixDQUFDO1lBQ25DLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNuQyxVQUFVLENBQUMsdUJBQXVCLENBQUM7U0FDcEM7S0FDRjtDQUNGLENBQUM7QUFZRixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUUvQixNQUFNLFVBQVUsY0FBYyxDQUFDLFNBQW9CO0lBQ2pELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQW9CLENBQUM7SUFDckUsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIn0=