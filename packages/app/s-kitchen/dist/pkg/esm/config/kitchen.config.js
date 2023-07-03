export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        defaultRecipe: 'generic',
        exclude: [],
        recipes: {
            /**
             * @name            generic
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeGeneric]
             *
             * Specify the default recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get generic() {
                return api.config.kitchenRecipeGeneric;
            },
            /**
             * @name            nextJs12
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeNextJs12]
             *
             * Specify the next.js recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nextJs12() {
                return api.config.kitchenRecipeNextJs12;
            },
        },
        get actions() {
            return api.config.kitchenActions;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxhQUFhLEVBQUUsU0FBUztRQUV4QixPQUFPLEVBQUUsRUFBRTtRQUVYLE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE9BQU87Z0JBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQzNDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxRQUFRO2dCQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUM1QyxDQUFDO1NBQ0o7UUFFRCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3JDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9